import { IsNotEmpty, IsString } from 'class-validator';
import { Currency } from 'src/enum/currency.enum';

export class CreateWalletDto {
  @IsString()
  currency: Currency;

  @IsString()
  @IsNotEmpty()
  walletId: string;
}
