import { Entity, EntityRepositoryType, Enum, Property } from '@mikro-orm/core';

import { UserRepository } from '../user/user.repository';
import { BaseEntity } from '../abstract-base-entity/base.entity';
import Role from '../enum/role.enum';

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
  @Enum({ items: () => Role, array: false, default: Role.User })
  role: Role = Role.User;
  @Property()
  lastLoggedIn?: Date;
  @Property()
  password: string;
}
