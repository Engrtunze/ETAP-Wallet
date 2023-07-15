import { Migration } from '@mikro-orm/migrations';

export class Migration20230714222340 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" drop constraint "user_email_unique";');
    this.addSql('alter table "user" drop column "email";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" add column "email" varchar(255) null;');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
  }

}
