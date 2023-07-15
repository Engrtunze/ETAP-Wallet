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
import Role from '../../enum/role.enum';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  phone: string;
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  @MaxLength(4)
  @MinLength(4)
  transactionPin: string;
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: string;
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @ApiHideProperty()
  role: Role;
}
