import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create.wallet.dto';
import { UserService } from 'src/user/user.service';
import { WalletRepository } from './wallet.repository';
import { Currency } from 'src/enum/currency.enum';
import { JwtService } from '@nestjs/jwt';
import { DecodeToken } from 'src/util/jwt-decode-token';
import { WalletCreatedDto } from './dto/wallet-created.to';
import { WalletMapper } from 'src/mappers/wallet.mapper';
import { Wallet } from './wallet.entity';

@Injectable()
export class WalletService {
  constructor(
    private readonly userService: UserService,
    private readonly walletRepository: WalletRepository,
    private jwtService: JwtService,
    private readonly walletMapper: WalletMapper,
  ) {}

  async create(request: CreateWalletDto) {
    const wallet = this.walletRepository.create(request);
    return this.walletRepository.createWallet(wallet);
  }
  async createWallet(
    userId: string,
    request: CreateWalletDto,
  ): Promise<WalletCreatedDto> {
    const req = await DecodeToken.getUserIdFromToken(this.jwtService, userId);
    const userData = await this.userService.findUserById(req);

    const walletData = await this.walletRepository.findOne({
      walletId: request.walletId,
    });

    //check if user has creaed transaction pin before creating new wallet
    if (!userData.transactionPin) {
      throw new BadRequestException(
        'Transaction pin is not set kindly create a transaction first',
      );
    }

    const userWallet = await this.walletRepository.findUserWallets(userData.id);
    // Check if the user has already created a wallet with the same currency
    const existingWallet = userWallet.find(
      (wallet) => wallet.currency === request.currency,
    );
    if (existingWallet) {
      throw new BadRequestException(
        'Cannot create more than one wallet with the same currency',
      );
    }

    const isValidCurrency = Object.values(Currency).includes(
      request.currency as Currency,
    );

    if (!isValidCurrency) {
      throw new BadRequestException(
        'The requested currency is not valid, available currencies for now are (USD/EUR/GBP/NGN/AUD)',
      );
    }
    if (walletData) {
      throw new BadRequestException('Wallet Id taken');
    }

    const newWallet = await this.create({
      ...request,
      user: userData,
      balance: 0,
    });
    return this.walletMapper.mapToWalletCreatedDto(newWallet);
  }

  async getWallet(userId: string): Promise<Wallet> {
    return await this.walletRepository.findOneOrFail({
      user: userId,
    });
  }

  async getWalletId(walletId: string): Promise<Wallet> {
    return await this.walletRepository.findOneOrFail({
      walletId: walletId,
    });
  }

  async updateWalletBalance(
    amount: number,
    walletUUid: string,
  ): Promise<boolean> {
    const updateBalance = await this.walletRepository.findOneOrFail({
      id: walletUUid,
    });
    updateBalance.balance = amount;
    await this.walletRepository.createWallet(updateBalance);
    return true;
  }
}
