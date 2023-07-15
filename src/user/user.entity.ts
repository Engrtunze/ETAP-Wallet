import { Entity, EntityRepositoryType, Property } from '@mikro-orm/core';

import { UserRepository } from '../user/user.repository';
import { BaseEntity } from '../abstract-base-entity/base.entity';

@Entity({ customRepository: () => UserRepository })
export class User extends BaseEntity {
  [EntityRepositoryType]?: UserRepository;
  @Property()
  firstName: string;
  @Property()
  lastName: string;
  email?: string;
  @Property({ unique: true })
  phone: string;
  @Property()
  transactionPin?: string;
  @Property()
  isAdmin?: boolean;
  @Property()
  lastLoggedIn?: Date;
  @Property()
  password: string;
}
