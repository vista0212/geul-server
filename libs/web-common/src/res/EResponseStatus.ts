import { ResponseStatus } from '@app/web-common/res/ResponseStatus';

export class EResponseStatus {
  static readonly BAD_PARAMETER = new EResponseStatus(
    ResponseStatus.BAD_PARAMETER,
    '요청 값에 문제가 있습니다.',
  );

  static readonly PAYLOAD_TOO_LARGE = new EResponseStatus(
    ResponseStatus.PAYLOAD_TOO_LARGE,
    '제한된 요청 항목 크기를 초과했습니다.',
  );

  static readonly BAD_IMAGE_REQUEST = new EResponseStatus(
    ResponseStatus.BAD_PARAMETER,
    '5MB 이하의 jpg, png, jpeg 파일만 업로드 가능합니다.',
  );

  constructor(readonly _code: ResponseStatus, readonly _message: string) {}

  get code(): ResponseStatus {
    return this._code;
  }

  get message(): string {
    return this._message;
  }
}
