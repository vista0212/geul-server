import { Logger } from '@app/logger/Logger';
import { ResponseEntity } from '@app/web-common/res/ResponseEntity';
import { ResponseStatus } from '@app/web-common/res/ResponseStatus';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: HttpException, host: ArgumentsHost): any {
    const request = host.switchToHttp().getRequest<Request>();
    const response = host.switchToHttp().getResponse<Response>();
    const message = exception.message;
    const statusCode = HttpStatus[exception.getStatus()];

    this.logger.info(
      `HttpExceptionFilter Exception: requestSize=${
        request.headers?.['content-length']
      }, response=${JSON.stringify(exception.getResponse())}`,
      exception,
    );

    response
      .status(HttpStatus.OK)
      .json(
        instanceToPlain(
          ResponseEntity.ERROR_WITH(message, statusCode as ResponseStatus),
        ),
      );
  }
}
