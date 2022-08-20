import { ApiProperty } from '@nestjs/swagger';
import { LocalDateTime } from '@js-joda/core';
import { Exclude, Expose } from 'class-transformer';
import { Post } from '@app/entity/post/Post.entity';
import { DateTimeUtil } from '@app/entity/utils/DateTimeUtil';

export class PostFindOnePublishResponse {
  @Exclude()
  private readonly _id: number;
  @Exclude()
  private readonly _title: string;
  @Exclude()
  private readonly _body: string;
  @Exclude()
  private readonly _publishedAt?: LocalDateTime;
  @Exclude()
  private readonly _viewCount: number;

  constructor(post: Post) {
    this._id = post.id;
    this._title = post.title;
    this._body = post.body;
    this._publishedAt = post.publishedAt;
    this._viewCount = post.viewCount;
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

  @ApiProperty({ type: 'string' })
  @Expose()
  get publishedAt(): string | undefined {
    return this._publishedAt && DateTimeUtil.toString(this._publishedAt);
  }

  @ApiProperty()
  @Expose()
  get viewCount(): number {
    return this._viewCount;
  }
}
