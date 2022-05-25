import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Post } from '@app/entity/post/Post.entity';
import { EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class PostQueryRepository {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: EntityRepository<Post>,
  ) {}

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
