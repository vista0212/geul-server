import { HttpStatus } from '@nestjs/common/enums/http-status.enum';

type DefaultFactoryParameter = {
  message: string;
  parameter?: object;
  responseMessage?: string;
};

export class DomainError extends Error {
  private readonly _responseStatus: HttpStatus;
  private readonly _responseMessage?: string;
  private readonly _parameter?: object;

  private constructor(
    message: string,
    responseStatus: HttpStatus,
    responseMessage?: string,
    parameter?: object,
  ) {
    super(message);
    this._responseStatus = responseStatus;
    this._responseMessage = responseMessage;
    this._parameter = parameter;
    Error.captureStackTrace(this, this.constructor);
  }

  static isMe(error: any) {
    return error && error instanceof DomainError;
  }

  static TooManyRequests({
    message,
    parameter,
    responseMessage,
  }: DefaultFactoryParameter) {
    return new DomainError(
      message,
      HttpStatus.TOO_MANY_REQUESTS,
      responseMessage,
      parameter,
    );
  }

  static Unauthorized({
    message,
    parameter,
    responseMessage,
  }: DefaultFactoryParameter) {
    return new DomainError(
      message,
      HttpStatus.UNAUTHORIZED,
      responseMessage,
      parameter,
    );
  }

  static Forbidden({
    message,
    parameter,
    responseMessage,
  }: DefaultFactoryParameter) {
    return new DomainError(
      message,
      HttpStatus.FORBIDDEN,
      responseMessage,
      parameter,
    );
  }

  static NotFound({
    message,
    parameter,
    responseMessage,
  }: DefaultFactoryParameter) {
    return new DomainError(
      message,
      HttpStatus.NOT_FOUND,
      responseMessage,
      parameter,
    );
  }

  static BadRequest({
    message,
    parameter,
    responseMessage,
  }: DefaultFactoryParameter) {
    return new DomainError(
      message,
      HttpStatus.BAD_REQUEST,
      responseMessage,
      parameter,
    );
  }

  static SystemError(errorLogMessage: string, parameter?: object) {
    return new DomainError(
      errorLogMessage,
      HttpStatus.INTERNAL_SERVER_ERROR,
      '시스템 에러가 발생하였습니다.',
      parameter,
    );
  }

  get isSystemError() {
    return this._responseStatus === 500;
  }

  get responseMessage(): string {
    return this._responseMessage ?? this.message;
  }

  get responseStatus(): HttpStatus {
    return this._responseStatus;
  }

  get parameter(): object {
    return this._parameter ?? {};
  }
}
