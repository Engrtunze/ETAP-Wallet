import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminCreateUserDto } from 'src/user/dto/admin-create-user.dto';
import { UserCreatedDto } from 'src/user/dto/user-created.dto';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create.wallet.dto';
import { Wallet } from './wallet.entity';
import { AuthService } from 'src/auth/auth.service';

@Controller('wallet')
export class WalletController {
  constructor(
    private readonly walletService: WalletService,
    private readonly authService: AuthService,
  ) {}

  @Post('/create-wallet')
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ status: HttpStatus.CREATED })
  @ApiOperation({ summary: 'create user wallet' })
  @UseGuards(JwtAuthGuard)
  async createWallet(
    @Req() request: Request,
    @Body(ValidationPipe) createWallet: CreateWalletDto,
  ): Promise<Wallet> {
    const user = request.headers['authorization'];
    const userId = user.split(' ')[1];
    return this.walletService.createWallet(userId, createWallet);
  }
}
