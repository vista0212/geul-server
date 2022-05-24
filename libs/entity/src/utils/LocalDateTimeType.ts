import { convert, LocalDateTime } from '@js-joda/core';
import { Type } from '@mikro-orm/core';

export class LocalDateTimeType extends Type<LocalDateTime | null, Date | null> {
  override convertToDatabaseValue(
    value: LocalDateTime | Date | string,
  ): Date | null {
    if (!value) {
      return null;
    }

    if (typeof value === 'string') {
      return new Date(value);
    }

    if (value instanceof Date) {
      return value;
    }

    return convert(value).toDate();
  }

  override convertToJSValue(value: LocalDateTime | null): LocalDateTime | null {
    return value;
  }
}
