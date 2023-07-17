import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateChargeRequestDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  amount: string;
  metadata: {
    custom_fields: {
      value: string;
      display_name: string;
      variable_name: string;
    }[];
  };
  @IsNotEmpty()
  card: {
    cvv: string;
    number: string;
    expiry_month: string;
    expiry_year: string;
  };
  @IsNotEmpty()
  pin: string;
}
