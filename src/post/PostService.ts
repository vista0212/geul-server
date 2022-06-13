import { Injectable } from '@nestjs/common';
import { PostCreateRequest } from './dto/PostCreateRequest';
import { PostQueryRepository } from './PostQueryRepository';
import { PostFindRequest } from './dto/PostFindRequest';
import { LocalDateTime } from '@js-joda/core';
import { PostOneResponse } from './dto/PostOneResponse';

@Injectable()
export class PostService {
  constructor(private readonly postQueryRepository: PostQueryRepository) {}

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
