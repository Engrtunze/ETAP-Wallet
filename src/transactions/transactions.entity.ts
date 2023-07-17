import {
  Entity,
  EntityRepositoryType,
  Enum,
  ManyToOne,
  Property,
} from '@mikro-orm/core';

import { BaseEntity } from '../abstract-base-entity/base.entity';
import { TransactionRepository } from './transaction.repository';
import { Wallet } from '../wallet/wallet.entity';
import { TransactionType } from '../enum/transaction-status.enum.dto';
import { TransactionStatus } from '../enum/transaction-type.enum.dto';
import { TransactionProcessType } from '../enum/transaction-process-type.enum';

@Entity({ customRepository: () => TransactionRepository })
export class Transactions extends BaseEntity {
  [EntityRepositoryType]?: TransactionRepository;
  @Property()
  TransactionReference: string;
  @Property({ type: 'number' })
  amount!: number;
  @Property()
  description: string;
  @Enum(() => TransactionType)
  type!: TransactionType;
  @Enum(() => TransactionProcessType)
  processType!: TransactionProcessType;
  @Enum(() => TransactionStatus)
  status: TransactionStatus = TransactionStatus.PENDING;
  @ManyToOne(() => Wallet)
  wallet: Wallet;
}
