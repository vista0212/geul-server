import { BaseTimeEntity } from '@app/entity/BaseTimeEntity';
import { PostStatus } from '@app/entity/post/type/PostType';
import { Entity, Property } from '@mikro-orm/core';

@Entity()
export class Post extends BaseTimeEntity {
  @Property()
  title: string;

  @Property()
  body: string;

  @Property()
  status: PostStatus;

  @Property()
  viewCount: number;
}
