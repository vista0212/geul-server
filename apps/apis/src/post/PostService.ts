import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PostCreateRequest } from './dto/PostCreateRequest';
import { PostQueryRepository } from './PostQueryRepository';
import { PostFindRequest } from './dto/PostFindRequest';
import { LocalDateTime } from '@js-joda/core';
import { PostOneResponse } from './dto/PostOneResponse';
import { Post } from '@app/entity/post/Post.entity';
import { PostFindOnePublishRequest } from './dto/PostFindOnePublishRequest';

@Injectable()
export class PostService {
  constructor(private readonly postQueryRepository: PostQueryRepository) {}

  async findOnePublish(
    request: PostFindOnePublishRequest,
    now = LocalDateTime.now(),
  ): Promise<Post> {
    const result = await this.postQueryRepository.findOne(request.id);

    if (!result) {
      throw new NotFoundException('존재하지 않는 게시글입니다.');
    }

    if (!result.isPublish(now)) {
      throw new ForbiddenException('공개되지 않은 게시글입니다.');
    }

    return result;
  }

  async find(
    request: PostFindRequest,
    now = LocalDateTime.now(),
  ): Promise<PostOneResponse[]> {
    const result = await this.postQueryRepository.find(request, now);

    return result.map((v) => new PostOneResponse(v));
  }

  async create(request: PostCreateRequest): Promise<void> {
    await this.postQueryRepository.create(request.toEntity());
  }
}
