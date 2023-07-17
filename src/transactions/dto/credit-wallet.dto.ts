import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class CreditWalletDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  amount: string;
  @IsString()
  @IsNotEmpty()
  cardPin: string;
  @IsString()
  @IsNotEmpty()
  cvv: string;
  @IsString()
  @IsNotEmpty()
  cardNumber: string;
  @IsString()
  @IsNotEmpty()
  expiry_month: string;
  @IsString()
  @IsNotEmpty()
  expiry_year: string;
}
