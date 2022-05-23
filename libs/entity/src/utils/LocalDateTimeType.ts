import { convert, LocalDateTime } from '@js-joda/core';
import { Type } from '@mikro-orm/core';

export class LocalDateTimeType extends Type<LocalDateTime | null, Date | null> {
  override convertToDatabaseValue(value: LocalDateTime): Date | null {
    if (!value) {
      return null;
    }

    return convert(value).toDate();
  }

  override convertToJSValue(value: LocalDateTime | null): LocalDateTime | null {
    return value;
  }
}
