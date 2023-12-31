import { BadRequestException, Injectable } from '@nestjs/common';
import { TransactionRepository } from './transaction.repository';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { Transactions } from './transactions.entity';
import { JwtService } from '@nestjs/jwt';
import { WalletService } from '../wallet/wallet.service';
import { DecodeToken } from '../util/jwt-decode-token';
import { TransactionType } from '../enum/transaction-status.enum.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import generateTransactionReference from 'src/util/transaction-ref-gen';
import { EntityManager } from '@mikro-orm/core';
import { Wallet } from 'src/wallet/wallet.entity';
import { TransactionStatus } from 'src/enum/transaction-type.enum.dto';
import { TransactionProcessType } from 'src/enum/transaction-process-type.enum';
import { WithdrawTransferDto } from './dto/create-withdraw.dto';
import { CreateGetTransactionSummary } from './dto/create-get-transaction-summary.dto';
import { GetTransactionSummary } from './dto/get-transaction-summary.dto';
import { CreditWalletDto } from './dto/credit-wallet.dto';
import { PaymentServiceService } from 'src/payment-service/payment-service.service';
import { CreateChargeRequestDto } from 'src/payment-service/dto/create-charge-request.dto';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly jwtService: JwtService,
    private readonly walletService: WalletService,
    private readonly userService: UserService,
    private readonly entityManager: EntityManager,
    private readonly paymentService: PaymentServiceService,
  ) {}

  async create(request: CreateTransferDto) {
    const transfer = this.transactionRepository.create(request);
    return this.transactionRepository.createTransaction(transfer);
  }

  async creditRecipient(
    creditRequest: CreateTransferDto,
    walletId: Wallet,
  ): Promise<Transactions> {
    return await this.create({
      ...creditRequest,
      senderWalletId: '',
      pin: '',
      type: TransactionType.CREDIT,
      TransactionReference: generateTransactionReference(),
      wallet: walletId,
      processType: TransactionProcessType.W2W,
    });
  }

  async debitSender(
    debitRequest: CreateTransferDto,
    walletId: Wallet,
  ): Promise<Transactions> {
    return await this.create({
      ...debitRequest,
      receiverWalletId: '',
      pin: '',
      type: TransactionType.DEBIT,
      TransactionReference: generateTransactionReference(),
      wallet: walletId,
      processType: TransactionProcessType.W2W,
    });
  }
  async debitSenderWithdraw(
    debitRequest: WithdrawTransferDto,
    walletId: Wallet,
  ): Promise<Transactions> {
    const description =
      debitRequest.description === null ||
      debitRequest.description === undefined
        ? `you sent ${debitRequest.amount} to ${debitRequest.receiverAccount} whose bank is ${debitRequest.receiverBank}`
        : `${debitRequest.description}/you sent ${debitRequest.amount} to ${debitRequest.receiverAccount} whose bank is ${debitRequest.receiverBank}`;

    // Use the 'description' variable in your code

    return await this.create({
      ...debitRequest,
      receiverWalletId: '',
      pin: '',
      type: TransactionType.DEBIT,
      TransactionReference: generateTransactionReference(),
      wallet: walletId,
      processType: TransactionProcessType.EXTERNAL,
      description: description,
    });
  }

  async transfer(
    userId: string,
    transferRequest: CreateTransferDto,
  ): Promise<Transactions> {
    return await this.entityManager.transactional(async () => {
      const req = await DecodeToken.getUserIdFromToken(this.jwtService, userId);
      const senderWallet = await this.walletService.getWallet(req);
      const user = await this.userService.findUserById(req);
      //validate user pin
      if (
        !user &&
        (await bcrypt.compare(transferRequest.pin, user.transactionPin))
      ) {
        throw new BadRequestException('wrong transaction pin');
      }
      //validate sender walletId
      if (senderWallet.walletId !== transferRequest.senderWalletId) {
        throw new BadRequestException('invalid wallet id for user');
      }

      const receiverWallet = await this.walletService.getWalletId(
        transferRequest.receiverWalletId,
      );

      if (!receiverWallet) {
        throw new BadRequestException('wallet not found');
      }

      if (senderWallet.balance < transferRequest.amount) {
        throw new BadRequestException('Insufficient funds');
      }

      if (senderWallet.currency !== receiverWallet.currency) {
        throw new BadRequestException(
          'You can only transfer to same kind of currency, currency conversion service is not available at the moment',
        );
      }

      const balance = senderWallet.balance - transferRequest.amount;
      //update sender wallet balance
      await this.walletService.updateWalletBalance(balance, senderWallet.id);
      //update receiver wallet balance
      const creditReceiverBalance =
        receiverWallet.balance + transferRequest.amount;

      await this.walletService.updateWalletBalance(
        creditReceiverBalance,
        receiverWallet.id,
      );

      const creditTransaction = await this.creditRecipient(
        transferRequest,
        receiverWallet,
      );

      const debitTransaction = await this.debitSender(
        transferRequest,
        senderWallet,
      );

      // Update the status of the credit transaction to "success"
      creditTransaction.status = TransactionStatus.SUCCESS;
      await this.transactionRepository.createTransaction(creditTransaction);

      // Update the status of the debit transaction to "success"
      debitTransaction.status = TransactionStatus.SUCCESS;
      await this.transactionRepository.createTransaction(debitTransaction);
      return debitTransaction;
    });
  }

  async withdraw(
    userId: string,
    withdrawRequest: WithdrawTransferDto,
  ): Promise<{ transaction: Transactions; message: string }> {
    // due to limited time i would have mapped Transactions to a custom DTO to reduce the numbers data returned in a cleaner way
    return await this.entityManager.transactional(async () => {
      const req = await DecodeToken.getUserIdFromToken(this.jwtService, userId);
      const senderWallet = await this.walletService.getWallet(req);
      const user = await this.userService.findUserById(req);
      //validate user pin
      if (
        !user &&
        (await bcrypt.compare(withdrawRequest.pin, user.transactionPin))
      ) {
        throw new BadRequestException('wrong transaction pin');
      }
      //validate sender walletId
      if (senderWallet.walletId !== withdrawRequest.senderWalletId) {
        throw new BadRequestException('invalid wallet id for user');
      }

      if (senderWallet.balance < withdrawRequest.amount) {
        throw new BadRequestException('Insufficient funds');
      }

      const balance = senderWallet.balance - withdrawRequest.amount;
      if (withdrawRequest.amount > 1000000) {
        const debitTransaction = await this.debitSenderWithdraw(
          withdrawRequest,
          senderWallet,
        );

        // Update the status of the debit transaction to "success"
        debitTransaction.status = TransactionStatus.PENDING;
        await this.transactionRepository.createTransaction(debitTransaction);
        return {
          transaction: debitTransaction,
          message:
            'Transaction Pending: Transaction over 1 million needs to be approved',
        };
      }
      //update sender wallet balance
      await this.walletService.updateWalletBalance(balance, senderWallet.id);

      const debitTransaction = await this.debitSenderWithdraw(
        withdrawRequest,
        senderWallet,
      );

      // Update the status of the debit transaction to "success"
      debitTransaction.status = TransactionStatus.SUCCESS;
      await this.transactionRepository.createTransaction(debitTransaction);
      return {
        transaction: debitTransaction,
        message: 'Transaction Successful',
      };
    });
  }

  async creditWallet(
    userId: string,
    creditWallet: CreditWalletDto,
  ): Promise<Transactions> {
    return await this.entityManager.transactional(async () => {
      const req = await DecodeToken.getUserIdFromToken(this.jwtService, userId);
      const receiverWallet = await this.walletService.getWallet(req);

      if (!receiverWallet) {
        throw new BadRequestException('invalid wallet id for user');
      }
      //multiply amount by 100 convert it to kobo
      const amountKobo = parseInt(creditWallet.amount) * 100;

      const requestDto = new CreateChargeRequestDto();
      requestDto.amount = amountKobo.toString();
      requestDto.email = creditWallet.email;
      requestDto.pin = creditWallet.cardPin;
      requestDto.card = {
        cvv: creditWallet.cvv,
        number: creditWallet.cardNumber,
        expiry_month: creditWallet.expiry_month,
        expiry_year: creditWallet.expiry_year,
      };
      requestDto.metadata = {
        custom_fields: [
          {
            value: 'custom_value1',
            display_name: 'custom_display_name1',
            variable_name: 'custom_variable_name1',
          },
          {
            value: 'custom_value2',
            display_name: 'custom_display_name2',
            variable_name: 'custom_variable_name2',
          },
        ],
      };

      const getPaystackRes = await this.paymentService.paystackCharge(
        requestDto,
      );

      if (
        !getPaystackRes.data.status ||
        !getPaystackRes.data.status.includes('success')
      ) {
        throw new BadRequestException('Something went wrong');
      }

      const verify = await this.paymentService.verifyTransaction(
        getPaystackRes.data.reference,
      );

      if (!verify.data.status || !verify.data.status.includes('success')) {
        throw new BadRequestException('Something went wrong 2');
      }

      const paystackAmountNiara = verify.data.amount / 100;

      const creditReceiverBalance =
        receiverWallet.balance + paystackAmountNiara;

      await this.walletService.updateWalletBalance(
        creditReceiverBalance,
        receiverWallet.id,
      );

      return await this.create({
        senderWalletId: '',
        receiverWalletId: receiverWallet.id,
        pin: '',
        amount: paystackAmountNiara,
        type: TransactionType.CREDIT,
        TransactionReference: generateTransactionReference(),
        wallet: receiverWallet,
        processType: TransactionProcessType.EXTERNAL,
        description: `you recieved ${paystackAmountNiara} from paystack merchant with ${verify.data.customer.email}`,
      });
    });
    // another validation that could be added to this method is validation the currency of the wallet the user is about to credit with the currency coming from paystack but due to limited time for submission i have to skip that.
  }

  async getTransactionSummary(
    createSummary: CreateGetTransactionSummary,
  ): Promise<GetTransactionSummary[]> {
    return this.transactionRepository.getMonthlyPaymentSummaries(createSummary);
  }
}
