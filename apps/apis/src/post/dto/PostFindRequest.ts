import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';
import { FilterQuery } from '@mikro-orm/core';
import { Post } from '@app/entity/post/Post.entity';
import { PostStatus } from '@app/entity/post/type/PostType';
import { LocalDateTime } from '@js-joda/core';
import { SliceRequest } from '@app/web-common/req/SliceRequest';
import { ApiProperty } from '@nestjs/swagger';

export class PostFindRequest extends SliceRequest {
  @ApiProperty()
  @IsInt()
  @IsOptional()
  override lastId?: number;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  tags: string[] = [];

  @ApiProperty()
  @IsOptional()
  @IsString()
  keyword: string;

  toWhereFilter(now: LocalDateTime): FilterQuery<Post> {
    const where: FilterQuery<Post> = {};

    if (this.lastId) {
      where.id = { $lt: this.lastId };
    }

    if (this.keyword) {
      where.$or = [
        { title: { $ilike: `%${this.keyword}%` } },
        { body: { $ilike: `%${this.keyword}%` } },
      ];
    }

    where.status = PostStatus.PUBLISH;
    where.publishedAt = { $lte: now };

    return where;
  }
}
