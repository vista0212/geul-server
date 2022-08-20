import { Module } from '@nestjs/common';
import { PostController } from './PostController';
import { PostModule } from '@app/entity/post/PostModule';
import { PostService } from './PostService';
import { PostQueryRepository } from './PostQueryRepository';

@Module({
  controllers: [PostController],
  imports: [PostModule],
  providers: [PostService, PostQueryRepository],
})
export class PostAppModule {}
