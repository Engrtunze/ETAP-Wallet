import { ApiHideProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
export class AdminCreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  phone: string;
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @ApiHideProperty()
  isAdmin: boolean;
}
