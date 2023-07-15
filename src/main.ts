import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { getSwaggerOptions } from './config/swagger-setup';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  const options = getSwaggerOptions();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  const globalPrefix = process.env.API_VERSION || 'v1';
  app.enableCors();
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());
  app.enableShutdownHooks();
  await app.listen(3000);
  logger.log(`Application listening on port 3000`);

  const swaggerUrl = `${await app.getUrl()}/docs`;
  logger.log(`Swagger documentation is available at: ${swaggerUrl}`);
}
bootstrap();
