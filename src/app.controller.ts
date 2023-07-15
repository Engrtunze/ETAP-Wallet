import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EntityManager } from '@mikro-orm/core';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly em: EntityManager,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/test')
  async testConnection(): Promise<string> {
    await this.em.getConnection().execute('SELECT 1');
    return 'Database connection successful';
  }
}
