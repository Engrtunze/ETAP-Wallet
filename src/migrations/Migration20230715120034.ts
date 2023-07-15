import { Migration } from '@mikro-orm/migrations';

export class Migration20230715120034 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "role" text check ("role" in (\'User\', \'Admin\')) not null default \'User\';');
    this.addSql('alter table "user" drop column "is_admin";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" add column "is_admin" boolean null;');
    this.addSql('alter table "user" drop column "role";');
  }

}
