import { Logger } from '@app/logger/Logger';
import { CustomValidationError } from '@app/web-common/pipe/validation/CustomValidationError';
import { EResponseStatus } from '@app/web-common/res/EResponseStatus';
import { ResponseEntity } from '@app/web-common/res/ResponseEntity';
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { ValidationError } from 'class-validator';
import { Request, Response } from 'express';

@Catch(BadRequestException)
export class BadParameterFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: any, host: ArgumentsHost): any {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();

    const responseBody = exception.response;
    const isValidationError = responseBody instanceof ValidationError;

    this.logger.error(
      `BadParameterFilter Exception:
      path=${request.url},
      body=${JSON.stringify(responseBody)},
      `,
      exception,
    );

    response
      .status(HttpStatus.OK)
      .json(
        instanceToPlain(
          ResponseEntity.ERROR_WITH_DATA<CustomValidationError[]>(
            EResponseStatus.BAD_PARAMETER.message,
            EResponseStatus.BAD_PARAMETER.code,
            isValidationError
              ? [this.toCustomValidationErrorByNest(responseBody)]
              : (responseBody.message as CustomValidationError[]),
          ),
        ),
      );
  }

  toCustomValidationErrorByNest(
    responseBody: ValidationError,
  ): CustomValidationError {
    return new CustomValidationError(responseBody);
  }
}
