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
    try {
      return await this.postRepository.findOne(postId);
    } catch (e) {
      console.error(
        `PostQueryRepository.findOne Exception: postId=${postId}`,
        e,
      );

      throw e;
    }
  }

  async find(request: PostFindRequest, now: LocalDateTime): Promise<Post[]> {
    try {
      return await this.postRepository.find(request.toWhereFilter(now), {
        limit: request.limit,
        orderBy: { publishedAt: 'DESC' },
      });
    } catch (e) {
      console.error(
        `PostQueryRepository.find Exception: ${JSON.stringify(request)}`,
        e,
      );

      throw e;
    }
  }

  async create(post: Post): Promise<void> {
    try {
      await this.postRepository.persistAndFlush(post);
    } catch (e) {
      console.log(
        `PostQueryRepository.create Exception: ${JSON.stringify(post)}`,
        e,
      );

      throw e;
    }
  }
}
