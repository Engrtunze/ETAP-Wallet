import { User } from './user.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';

export class UserRepository extends EntityRepository<User> {
  constructor(private readonly entityManager: EntityManager) {
    super(entityManager, User);
  }
  async createUser(user: User) {
    await this.entityManager.persistAndFlush(user);
    return user;
  }
}
