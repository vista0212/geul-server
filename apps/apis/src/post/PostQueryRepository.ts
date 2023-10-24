import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Post } from '@app/entity/post/Post.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { LocalDateTime } from '@js-joda/core';
import { FilterQuery } from '@mikro-orm/core';
import { PostStatus } from '@app/entity/post/type/PostType';

@Injectable()
export class PostQueryRepository {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: EntityRepository<Post>,
  ) {}

  async findOne(postId: number): Promise<Post | null> {
    return await this.postRepository.findOne(postId);
  }

  async find(
    limit: number,
    now: LocalDateTime,
    keyword?: string,
    lastId?: number,
  ): Promise<Post[]> {
    const where: FilterQuery<Post> = {};

    if (lastId) {
      where.id = { $lt: lastId };
    }

    if (keyword) {
      where.$or = [
        { title: { $ilike: `%${keyword}%` } },
        { body: { $ilike: `%${keyword}%` } },
      ];
    }

    where.status = PostStatus.PUBLISH;
    where.publishedAt = { $lte: now };

    return await this.postRepository.find(where, {
      limit: limit,
      orderBy: { publishedAt: 'DESC' },
    });
  }

  async create(post: Post): Promise<void> {
    await this.postRepository.persistAndFlush(post);
  }
}
