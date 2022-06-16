import { LocalDate, LocalDateTime } from '@js-joda/core';

export class DateTimeUtil {
  static toString(value: LocalDateTime | LocalDate): string {
    return value.toString();
  }

  static isEqualsOrBefore(source: LocalDate, target: LocalDate): boolean;
  static isEqualsOrBefore(
    source: LocalDateTime,
    target: LocalDateTime,
  ): boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
  static isEqualsOrBefore(source: any, target: any) {
    return source.isEqual(target) || source.isBefore(target);
  }
}
