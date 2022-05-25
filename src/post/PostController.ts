import { Body, Controller, Post } from '@nestjs/common';
import { PostCreateRequest } from './dto/PostCreateRequest';
import { ResponseEntity } from '@app/web-common/res/ResponseEntity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostService } from './PostService';

@Controller('/post')
@ApiTags('게시글 관련 API')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiOperation({
    summary: '게시글 작성 API',
  })
  async create(
    @Body() request: PostCreateRequest,
  ): Promise<ResponseEntity<string>> {
    try {
      await this.postService.create(request);
      return ResponseEntity.OK();
    } catch (e) {
      console.error(
        `error in POST /post: request=${JSON.stringify(request)}`,
        e,
      );

      return ResponseEntity.ERROR_WITH(e.message);
    }
  }
}
