import { Migration } from '@mikro-orm/migrations';

export class Migration20230714081501 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null default now(), "updated_at" timestamptz(0) not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "email" varchar(255) null, "phone" varchar(255) not null, "transaction_pin" varchar(255) null, "is_admin" boolean null, "last_logged_in" timestamptz(0) null, "password" varchar(255) not null, constraint "user_pkey" primary key ("id"));');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
    this.addSql('alter table "user" add constraint "user_phone_unique" unique ("phone");');
  }

}
