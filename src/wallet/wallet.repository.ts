import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Wallet } from './wallet.entity';
import { CreateWalletDto } from './dto/create.wallet.dto';

export class WalletRepository extends EntityRepository<Wallet> {
  constructor(private readonly entityManager: EntityManager) {
    super(entityManager, Wallet);
  }
  async createWallet(wallet: Wallet) {
    await this.entityManager.persistAndFlush(wallet);
    return wallet;
  }
}
