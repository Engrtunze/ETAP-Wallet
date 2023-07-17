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
import { WalletCreatedDto } from './dto/wallet-created.to';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('/create-wallet')
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ status: HttpStatus.CREATED })
  @ApiOperation({ summary: 'create user wallet' })
  @UseGuards(JwtAuthGuard)
  async createWallet(
    @Req() request: Request,
    @Body(ValidationPipe) createWallet: CreateWalletDto,
  ): Promise<WalletCreatedDto> {
    const user = request.headers['authorization'];
    const userId = user.split(' ')[1];
    return this.walletService.createWallet(userId, createWallet);
  }
}
