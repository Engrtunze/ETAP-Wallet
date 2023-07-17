import { Injectable } from '@nestjs/common';
import { Wallet } from 'src/wallet/wallet.entity';
import { WalletCreatedDto } from 'src/wallet/dto/wallet-created.to';

@Injectable()
export class WalletMapper {
  mapToWalletCreatedDto(wallet: Wallet): WalletCreatedDto {
    const { id, balance, user, walletId, currency, createdAt, updatedAt } =
      wallet;
    const userId = user.id;

    const walletCreatedDto: WalletCreatedDto = {
      id,
      balance,
      currency,
      walletId,
      user: userId,
      createdAt,
      updatedAt,
    };

    return walletCreatedDto;
  }
}
