import { Post } from '@app/entity/post/Post.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

@Module({
  imports: [MikroOrmModule.forFeature([Post])],
  exports: [MikroOrmModule],
})
export class PostModule {}
