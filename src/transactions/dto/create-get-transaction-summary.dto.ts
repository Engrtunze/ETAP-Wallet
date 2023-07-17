import { IsNotEmpty } from 'class-validator';
export class CreateGetTransactionSummary {
  @IsNotEmpty()
  year: number;
  @IsNotEmpty()
  month: number;
}
