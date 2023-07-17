export class WalletCreatedDto {
  id: string;
  balance: number;
  currency: string;
  walletId: string;
  user: string;
  createdAt: Date;
  updatedAt: Date;
}
