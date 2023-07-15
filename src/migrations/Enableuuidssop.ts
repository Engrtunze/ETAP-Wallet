import { Migration } from '@mikro-orm/migrations';

export class Migration20230714080400_EnableUuidOssp extends Migration {
  async up(): Promise<void> {
    // Enable the uuid-ossp extension
    await this.execute(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `);
  }

  async down(): Promise<void> {
    // Disable the uuid-ossp extension
    await this.execute(`
      DROP EXTENSION IF EXISTS "uuid-ossp";
    `);
  }
}
