import { Migration } from '@mikro-orm/migrations';

export class Migration20230717085435 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "transactions" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null default now(), "updated_at" timestamptz(0) not null, "transaction_reference" varchar(255) not null, "amount" int not null, "description" varchar(255) not null, "type" text check ("type" in (\'debit\', \'credit\')) not null, "process_type" text check ("process_type" in (\'wallet-to-wallet\', \'external\', \'Unknown\')) not null, "status" text check ("status" in (\'pending\', \'success\', \'failed\')) not null default \'pending\', "wallet_id" uuid not null, constraint "transactions_pkey" primary key ("id"));');

    this.addSql('alter table "transactions" add constraint "transactions_wallet_id_foreign" foreign key ("wallet_id") references "wallet" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "transactions" cascade;');
  }

}
