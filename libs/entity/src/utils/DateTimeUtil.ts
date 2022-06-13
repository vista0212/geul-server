import { LocalDate, LocalDateTime } from '@js-joda/core';

export class DateTimeUtil {
  static toString(value: LocalDateTime | LocalDate): string {
    return value.toString();
  }
}
