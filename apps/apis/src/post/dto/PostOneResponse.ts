import { PostStatus } from '@app/entity/post/type/PostType';
import { LocalDateTime } from '@js-joda/core';
import { Exclude, Expose } from 'class-transformer';
import { Post } from '@app/entity/post/Post.entity';
import { ApiProperty } from '@nestjs/swagger';
import { DateTimeUtil } from '@app/entity/utils/DateTimeUtil';

export class PostOneResponse {
  @Exclude()
  private readonly _id: number;

  @Exclude()
  private readonly _title: string;

  @Exclude()
  private readonly _body: string;

  @Exclude()
  private readonly _introduction: string;

  @Exclude()
  private readonly _status: PostStatus;

  @Exclude()
  private readonly _viewCount: number;

  @Exclude()
  private readonly _publishedAt?: LocalDateTime;

  @Exclude()
  private readonly _createdAt: LocalDateTime;

  @Exclude()
  private readonly _updatedAt: LocalDateTime;

  constructor(post: Post) {
    this._id = post.id;
    this._title = post.title;
    this._body = post.body;
    this._introduction = post.introduction;
    this._status = post.status;
    this._viewCount = post.viewCount;
    this._publishedAt = post.publishedAt;
    this._createdAt = post.createdAt;
    this._updatedAt = post.updatedAt;
  }

  @ApiProperty()
  @Expose()
  get id(): number {
    return this._id;
  }

  @ApiProperty()
  @Expose()
  get title(): string {
    return this._title;
  }

  @ApiProperty()
  @Expose()
  get body(): string {
    return this._body;
  }

  @ApiProperty()
  @Expose()
  get introduction(): string {
    return this._introduction;
  }

  @ApiProperty({ enum: PostStatus })
  @Expose()
  get status(): PostStatus {
    return this._status;
  }

  @ApiProperty()
  @Expose()
  get viewCount(): number {
    return this._viewCount;
  }

  @ApiProperty({ type: 'string' })
  @Expose()
  get publishedAt(): string | undefined {
    return this._publishedAt && DateTimeUtil.toString(this._publishedAt);
  }

  @ApiProperty()
  @Expose()
  get createdAt(): string {
    return DateTimeUtil.toString(this._createdAt);
  }

  @ApiProperty()
  @Expose()
  get updatedAt(): string {
    return DateTimeUtil.toString(this._updatedAt);
  }
}
