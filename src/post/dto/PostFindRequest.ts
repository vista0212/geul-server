import { IsArray, IsInt, IsOptional } from 'class-validator';
import { FilterQuery } from '@mikro-orm/core';
import { Post } from '@app/entity/post/Post.entity';
import { PostStatus } from '@app/entity/post/type/PostType';
import { LocalDateTime } from '@js-joda/core';
import { SliceRequest } from '@app/web-common/req/SliceRequest';

export class PostFindRequest extends SliceRequest {
  @IsInt()
  @IsOptional()
  lastId?: number;

  @IsArray()
  @IsOptional()
  tags: string[] = [];

  toWhereFilter(now: LocalDateTime): FilterQuery<Post> {
    const where: FilterQuery<Post> = {};

    if (this.lastId) {
      where.id = { $lt: this.lastId };
    }

    where.status = PostStatus.PUBLISH;
    where.publishedAt = { $lte: now };

    return where;
  }
}
