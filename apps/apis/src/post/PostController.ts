import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PostCreateRequest } from './dto/PostCreateRequest';
import { ResponseEntity } from '@app/web-common/res/ResponseEntity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostService } from './PostService';
import { PostFindRequest } from './dto/PostFindRequest';
import { Slice } from '@app/web-common/res/Slice';
import { PostOneResponse } from './dto/PostOneResponse';
import { PostFindOnePublishRequest } from './dto/PostFindOnePublishRequest';
import { PostFindOnePublishResponse } from './dto/PostFindOnePublishResponse';

@Controller('/post')
@ApiTags('게시글 관련 API')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @ApiOperation({
    summary: '게시글 목록 조회 API',
  })
  async find(
    @Query() request: PostFindRequest,
  ): Promise<ResponseEntity<Slice<PostOneResponse> | string>> {
    try {
      const posts = await this.postService.find(request);
      return ResponseEntity.OK_WITH(new Slice(request.sliceSize, posts));
    } catch (e) {
      console.error(
        `error in GET /post: request=${JSON.stringify(
          this.postService.find(request),
        )}`,
        e,
      );

      return ResponseEntity.ERROR_WITH(e.message);
    }
  }

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

  @Get('/:id')
  @ApiOperation({
    summary: '특정 게시글 조회 API',
  })
  async findOnePublish(
    @Param() request: PostFindOnePublishRequest,
  ): Promise<ResponseEntity<string | PostFindOnePublishResponse>> {
    try {
      const response = new PostFindOnePublishResponse(
        await this.postService.findOnePublish(request),
      );
      return ResponseEntity.OK_WITH(response);
    } catch (e) {
      console.error(`error in GET /post/:id: ${JSON.stringify(request)}`, e);

      return ResponseEntity.ERROR_WITH(e.message);
    }
  }
}
