import { ApiHideProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TransactionProcessType } from 'src/enum/transaction-process-type.enum';
import { TransactionType } from 'src/enum/transaction-status.enum.dto';
import { Wallet } from 'src/wallet/wallet.entity';
export class WithdrawTransferDto {
  @IsString()
  @IsNotEmpty()
  pin: string;
  @IsNotEmpty()
  amount: number;
  @IsOptional()
  @IsString()
  description?: string;
  @IsNotEmpty()
  @IsString()
  receiverAccount?: string;
  @IsNotEmpty()
  @IsString()
  receiverBank: string;
  @IsNotEmpty()
  @IsString()
  senderWalletId: string;

  @ApiHideProperty()
  type: TransactionType;
  @ApiHideProperty()
  TransactionReference: string;
  @ApiHideProperty()
  wallet: Wallet;
  @ApiHideProperty()
  processType: TransactionProcessType;
}
