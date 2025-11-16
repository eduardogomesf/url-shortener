import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Configuration } from '@/shared/config';
import { version } from 'package.json';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);

  const configs = app.select(AppModule).get(Configuration);

  app.setGlobalPrefix(configs.app.basePath);
  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfigs = new DocumentBuilder()
    .setTitle('URL Shortener API')
    .setDescription(
      'This service is responsible for URL shortening and its management',
    )
    .setVersion(version)
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfigs);

  SwaggerModule.setup(`${configs.app.basePath}`, app, swaggerDoc, {
    jsonDocumentUrl: `${configs.app.basePath}/json`,
  });

  await app.listen(configs.app.port, () =>
    logger.log(`Running on ${configs.app.port}`),
  );
}
bootstrap();
