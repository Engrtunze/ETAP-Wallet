import { ApiHideProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TransactionProcessType } from 'src/enum/transaction-process-type.enum';
import { TransactionType } from 'src/enum/transaction-status.enum.dto';
import { Wallet } from 'src/wallet/wallet.entity';
export class CreateTransferDto {
  @IsNotEmpty()
  @IsString()
  senderWalletId: string;
  @IsString()
  @IsNotEmpty()
  receiverWalletId: string;
  @IsString()
  @IsNotEmpty()
  pin: string;
  @IsNotEmpty()
  amount: number;
  @IsOptional()
  @IsString()
  description?: string;
  @ApiHideProperty()
  type: TransactionType;
  @ApiHideProperty()
  TransactionReference: string;
  @ApiHideProperty()
  wallet: Wallet;
  @ApiHideProperty()
  processType: TransactionProcessType;
}
