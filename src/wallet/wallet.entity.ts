import {
  Entity,
  EntityRepositoryType,
  Property,
  ManyToOne,
  Enum,
} from '@mikro-orm/core';
import { WalletRepository } from './wallet.repository';
import { BaseEntity } from '../abstract-base-entity/base.entity';
import { User } from '../user/user.entity';
import { Currency } from '../enum/currency.enum';

@Entity({ customRepository: () => WalletRepository })
export class Wallet extends BaseEntity {
  [EntityRepositoryType]?: WalletRepository;

  @Property({ type: 'number', default: 0 })
  balance!: number;

  @Enum(() => Currency)
  currency!: Currency;

  @Property({ unique: true })
  walletId!: string;

  @ManyToOne(() => User, { eager: true })
  user!: User;
}
