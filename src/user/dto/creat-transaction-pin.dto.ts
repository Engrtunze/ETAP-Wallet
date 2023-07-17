import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTransactionPinDto {
  @IsString()
  @MaxLength(4)
  @MinLength(4)
  transactionPin: string;
}
