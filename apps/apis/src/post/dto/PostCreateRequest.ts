import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Post } from '@app/entity/post/Post.entity';

export class PostCreateRequest {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  body: string;

  toEntity(): Post {
    return Post.createDraft(this.title, this.body);
  }
}
