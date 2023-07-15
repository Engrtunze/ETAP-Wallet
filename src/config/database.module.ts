import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { FlushMode } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dbName: configService.get('DB_NAME'),
        user: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        type: 'postgresql',
        entities: ['dist/**/*.entity.js'],
        entitiesTs: ['src/**/*.entity.ts'],
        metadataProvider: TsMorphMetadataProvider,
        flushMode: FlushMode.COMMIT,
        migrations: {
          tableName: 'migrations',
          path: 'dist/migrations',
          pathTs: 'src/migrations',
          glob: '!(*.d).{js,ts}',
          transactional: true,
          allOrNothing: true,
          emit: 'ts',
        },
      }),
    }),
  ],
})
export class DatabaseModule {}
