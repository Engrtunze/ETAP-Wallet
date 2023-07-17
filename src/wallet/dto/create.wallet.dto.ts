import { ApiHideProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Currency } from 'src/enum/currency.enum';
import { User } from 'src/user/user.entity';

export class CreateWalletDto {
  @IsString()
  currency: Currency;

  @IsString()
  @IsNotEmpty()
  walletId: string;

  @ApiHideProperty()
  user: User;
  @ApiHideProperty()
  balance: number;
}
