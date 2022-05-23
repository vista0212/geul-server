import { LocalDateTime } from '@js-joda/core';
import { PrimaryKey, Property } from '@mikro-orm/core';
import { LocalDateTimeType } from './utils/LocalDateTimeType';

export abstract class BaseTimeEntity {
  @PrimaryKey({ autoincrement: true })
  id: number;

  @Property({ type: LocalDateTimeType, onCreate: () => LocalDateTime.now() })
  createdAt: LocalDateTime;

  @Property({ type: LocalDateTimeType, onUpdate: () => LocalDateTime.now() })
  updatedAt: LocalDateTime;
}
