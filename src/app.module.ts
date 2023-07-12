import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { mikroOrmConfig } from './mikro-orm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MikroOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        mikroOrmConfig(configService),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
