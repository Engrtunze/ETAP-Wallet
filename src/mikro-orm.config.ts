import { Options } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const logger = new Logger('MikroORM');
export function mikroOrmConfig(configureService: ConfigService): Options {
  return {
    type: 'postgresql',
    host: configureService.get('DB_HOST'),
    port: parseInt(configureService.get('DB_PORT')),
    user: configureService.get('DB_USER'),
    password: configureService.get('DB_PASSWORD'),
    dbName: configureService.get('DB_NAME'),
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    metadataProvider: TsMorphMetadataProvider,
    logger: logger.log.bind(logger),
  };
}
