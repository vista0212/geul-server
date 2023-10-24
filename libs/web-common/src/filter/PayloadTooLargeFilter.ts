import { Logger } from '@app/logger/Logger';
import { EResponseStatus } from '@app/web-common/res/EResponseStatus';
import { ResponseEntity } from '@app/web-common/res/ResponseEntity';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  PayloadTooLargeException,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';

@Catch(PayloadTooLargeException)
export class PayloadTooLargeFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: PayloadTooLargeException, host: ArgumentsHost): any {
    const request = host.switchToHttp().getRequest<Request>();
    const response = host.switchToHttp().getResponse<Response>();
    this.logger.error(
      `PayloadTooLargeFilter Exception: requestSize=${
        request.headers?.['content-length']
      }, response=${JSON.stringify(exception.getResponse())}`,
      exception,
    );

    response
      .status(HttpStatus.OK)
      .json(
        instanceToPlain(
          ResponseEntity.ERROR_WITH(
            EResponseStatus.PAYLOAD_TOO_LARGE.message,
            EResponseStatus.PAYLOAD_TOO_LARGE.code,
          ),
        ),
      );
  }
}
