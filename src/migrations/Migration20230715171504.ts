import { Migration } from '@mikro-orm/migrations';

export class Migration20230715171504 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null default now(), "updated_at" timestamptz(0) not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "phone" varchar(255) not null, "transaction_pin" varchar(255) null, "role" text check ("role" in (\'User\', \'Admin\')) not null default \'User\', "last_logged_in" timestamptz(0) null, "password" varchar(255) not null, constraint "user_pkey" primary key ("id"));');
    this.addSql('alter table "user" add constraint "user_phone_unique" unique ("phone");');

    this.addSql('create table "wallet" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null default now(), "updated_at" timestamptz(0) not null, "balance" int not null default 0, "currency" text check ("currency" in (\'USD\', \'EUR\', \'GBP\', \'NGN\', \'AUD\', \'Unknown\')) not null, "wallet_id" varchar(255) not null, "user_id" uuid not null, constraint "wallet_pkey" primary key ("id"));');
    this.addSql('alter table "wallet" add constraint "wallet_wallet_id_unique" unique ("wallet_id");');

    this.addSql('alter table "wallet" add constraint "wallet_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "wallet" drop constraint "wallet_user_id_foreign";');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "wallet" cascade;');
  }

}
