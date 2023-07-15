import {
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class LogInUserDto {
  @IsOptional()
  @IsString()
  @IsMobilePhone('en-NG')
  phone: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
