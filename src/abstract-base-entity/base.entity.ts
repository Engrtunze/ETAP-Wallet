import { PrimaryKey, Property } from '@mikro-orm/core';

export abstract class BaseEntity {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  id: string;
  @Property({ defaultRaw: 'now()', type: Date, hidden: true })
  createdAt = new Date();
  @Property({ onUpdate: () => new Date(), type: Date, hidden: true })
  updatedAt = new Date();
}
