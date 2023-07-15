import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { LogInUserDto } from 'src/user/dto/login.dto';
import { UserCreatedDto } from 'src/user/dto/user-created.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ status: HttpStatus.CREATED })
  @ApiOperation({ summary: 'register a user' })
  signUp(
    @Body(ValidationPipe) authCredentialsDto: CreateUserDto,
  ): Promise<UserCreatedDto> {
    return this.authService.register(authCredentialsDto);
  }

  @Post('/login')
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ status: HttpStatus.CREATED })
  @ApiOperation({ summary: 'user login' })
  login(
    @Body(ValidationPipe) authCredentialsDto: LogInUserDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.login(authCredentialsDto);
  }
}
