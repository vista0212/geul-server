import { Injectable } from '@nestjs/common';
import { PostCreateRequest } from './dto/PostCreateRequest';
import { PostQueryRepository } from './PostQueryRepository';

@Injectable()
export class PostService {
  constructor(private readonly postQueryRepository: PostQueryRepository) {}

  async create(request: PostCreateRequest): Promise<void> {
    await this.postQueryRepository.create(request.toEntity());
  }
}
