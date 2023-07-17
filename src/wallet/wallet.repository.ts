import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Wallet } from './wallet.entity';

export class WalletRepository extends EntityRepository<Wallet> {
  constructor(private readonly entityManager: EntityManager) {
    super(entityManager, Wallet);
  }
  async createWallet(wallet: Wallet) {
    await this.entityManager.persistAndFlush(wallet);
    return wallet;
  }
  async findUserWallets(userId: string): Promise<Wallet[]> {
    const wallets = await this.em.find(Wallet, { user: userId });
    return wallets;
  }
}
