import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { setNestApp } from '@app/web-common/app/setNestApp';
import { GlobalExceptionFilter } from '@app/web-common/filter/GlobalExceptionFilter';
import { Logger } from '@app/logger/Logger';
import { HttpExceptionFilter } from '@app/web-common/filter/HttpExceptionFilter';
import { PayloadTooLargeFilter } from '@app/web-common/filter/PayloadTooLargeFilter';
import { BadParameterFilter } from '@app/web-common/filter/BadParameterFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('geul API')
    .setDescription('geul API description')
    .setVersion('1.0')
    .addTag('geul-api')
    .build();
  setNestApp(app);

  const logger = app.get(Logger);

  app.useGlobalFilters(
    new GlobalExceptionFilter(logger),
    new HttpExceptionFilter(logger),
    new PayloadTooLargeFilter(logger),
    new BadParameterFilter(logger),
  );

  app.enableCors();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3030);
}

bootstrap();
