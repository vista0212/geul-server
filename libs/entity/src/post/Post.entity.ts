import { BaseTimeEntity } from '@app/entity/BaseTimeEntity';
import { PostStatus } from '@app/entity/post/type/PostType';
import { Entity, Property } from '@mikro-orm/core';
import { LocalDateTime } from '@js-joda/core';
import { LocalDateTimeType } from '@app/entity/utils/LocalDateTimeType';
import { DateTimeUtil } from '@app/entity/utils/DateTimeUtil';

@Entity()
export class Post extends BaseTimeEntity {
  @Property()
  title: string;

  @Property()
  body: string;

  @Property()
  introduction: string;

  @Property()
  status: PostStatus;

  @Property()
  viewCount: number;

  @Property({ type: LocalDateTimeType, nullable: true })
  publishedAt?: LocalDateTime;

  static createDraft(title: string, body: string): Post {
    const post = new Post();

    post.title = title;
    post.body = body;
    post.status = PostStatus.DRAFT;
    post.viewCount = 0;

    return post;
  }

  isPublish(now: LocalDateTime): boolean {
    return (
      this.status === PostStatus.PUBLISH &&
      DateTimeUtil.isEqualsOrBefore(this.publishedAt, now)
    );
  }
}
