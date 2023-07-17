import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { Transactions } from './transactions.entity';
import { WithdrawTransferDto } from './dto/create-withdraw.dto';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { HasRoles } from 'src/auth/has-roles';
import Role from 'src/enum/role.enum';
import { CreateGetTransactionSummary } from './dto/create-get-transaction-summary.dto';
import { GetTransactionSummary } from './dto/get-transaction-summary.dto';
import { CreditWalletDto } from './dto/credit-wallet.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionService: TransactionsService) {}

  @Post('/transfer-wallet-to-wallet')
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ status: HttpStatus.CREATED })
  @ApiOperation({ summary: 'Transfer from wallet to another wallet' })
  @UseGuards(JwtAuthGuard)
  async createWallet(
    @Req() request: Request,
    @Body(ValidationPipe) createTransferDto: CreateTransferDto,
  ): Promise<Transactions> {
    const user = request.headers['authorization'];
    const userId = user.split(' ')[1];
    return this.transactionService.transfer(userId, createTransferDto);
  }

  @Post('/withdraw')
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ status: HttpStatus.CREATED })
  @ApiOperation({ summary: 'withdraw from wallet' })
  @UseGuards(JwtAuthGuard)
  async withdraw(
    @Req() request: Request,
    @Body(ValidationPipe) withdrawTransferDto: WithdrawTransferDto,
  ): Promise<{ transaction: Transactions; message: string }> {
    const user = request.headers['authorization'];
    const userId = user.split(' ')[1];
    return this.transactionService.withdraw(userId, withdrawTransferDto);
  }

  @Get('/get-summary/:year/:month')
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ status: HttpStatus.CREATED })
  @ApiOperation({ summary: 'withdraw from wallet' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(Role.Admin)
  async getSummary(
    @Req() request: Request,
    @Query(ValidationPipe) fetch: CreateGetTransactionSummary,
  ): Promise<GetTransactionSummary[]> {
    return this.transactionService.getTransactionSummary(fetch);
  }

  @Post('/credit-wallet')
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ status: HttpStatus.CREATED })
  @ApiOperation({ summary: 'withdraw from wallet' })
  @UseGuards(JwtAuthGuard)
  async creditWallet(
    @Req() request: Request,
    @Body(ValidationPipe) credit: CreditWalletDto,
  ): Promise<Transactions> {
    const user = request.headers['authorization'];
    const userId = user.split(' ')[1];
    return this.transactionService.creditWallet(userId, credit);
  }
}
