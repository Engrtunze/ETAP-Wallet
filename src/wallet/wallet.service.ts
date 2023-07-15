import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create.wallet.dto';
import { Wallet } from './wallet.entity';
import { UserService } from 'src/user/user.service';
import { WalletRepository } from './wallet.repository';
import { AuthService } from 'src/auth/auth.service';
import { Currency } from 'src/enum/currency.enum';

@Injectable()
export class WalletService {
  constructor(
    private readonly userService: UserService,
    private readonly walletRepository: WalletRepository,
    private readonly authService: AuthService,
  ) {}

  async createWallet(
    userId: string,
    request: CreateWalletDto,
  ): Promise<Wallet> {
    const req = await this.authService.getUserIdFromToken(userId);
    const userData = await this.userService.findUserById(req);
    const walletId = await this.walletRepository.findOne({
      walletId: request.walletId,
    });
    const isValidCurrency = Object.values(Currency).includes(
      request.currency as Currency,
    );
    if (!isValidCurrency) {
      throw new BadRequestException(
        'The requested currency is not valid, available currencies for now are (USD/EUR/GBP/NGN/AUD)',
      );
    }
    if (request.walletId === walletId.walletId) {
      throw new BadRequestException('Wallet Id taken');
    }

    const newWallet = this.walletRepository.create({
      ...request,
      user: userData,
      balance: 0,
    });
    return await this.walletRepository.createWallet(newWallet);
  }
}
