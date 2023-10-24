import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Post } from '@app/entity/post/Post.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { PostFindRequest } from './dto/PostFindRequest';
import { LocalDateTime } from '@js-joda/core';

@Injectable()
export class PostQueryRepository {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: EntityRepository<Post>,
  ) {}

  async findOne(postId: number): Promise<Post | null> {
    return await this.postRepository.findOne(postId);
  }

  async find(request: PostFindRequest, now: LocalDateTime): Promise<Post[]> {
    return await this.postRepository.find(request.toWhereFilter(now), {
      limit: request.limit,
      orderBy: { publishedAt: 'DESC' },
    });
  }

  async create(post: Post): Promise<void> {
    await this.postRepository.persistAndFlush(post);
  }
}
