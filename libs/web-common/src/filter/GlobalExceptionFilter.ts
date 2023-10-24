import { Logger } from '@app/logger/Logger';
import { ResponseEntity } from '@app/web-common/res/ResponseEntity';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const http = host.switchToHttp();
    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();

    this.logger.error(
      this.getErrorLogMessageTemplate(request),
      exception as Error,
    );

    response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(instanceToPlain(ResponseEntity.ERROR()));
  }

  private getErrorLogMessageTemplate(request: Request): string {
    return [
      `API Exception: path=${request.url}`,
      Object.keys(request.body).length > 0
        ? `body=${JSON.stringify(request.body)}`
        : null,
      Object.keys(request.query).length > 0
        ? `query=${JSON.stringify(request.query)}`
        : null,
    ]
      .filter(Boolean)
      .join(' ');
  }
}
