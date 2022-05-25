import {
  BadRequestException,
  ClassSerializerInterceptor,
  ValidationPipe,
} from '@nestjs/common';
import { INestApplication } from '@nestjs/common/interfaces/nest-application.interface';
import { Reflector } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import { CustomValidationError } from '@app/web-common/pipe/validation/CustomValidationError';

export function setNestApp<T extends INestApplication>(app: T): void {
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validationError: {
        value: true,
      },
      exceptionFactory: (validationErrors: ValidationError[] = []) =>
        new BadRequestException(
          validationErrors.map((e) => new CustomValidationError(e)),
        ),
    }),
  );
  app.setGlobalPrefix('api');
}
