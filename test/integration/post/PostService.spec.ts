import { Test } from '@nestjs/testing';
import { getMikroOrmTestModule } from '@app/entity/config/getMikroOrmTestModule';
import { PostModule } from '@app/entity/post/PostModule';
import { PostQueryRepository } from '../../../src/post/PostQueryRepository';
import { MikroORM } from '@mikro-orm/core';
import { PostFactory } from '../../utils/entityFactory/PostFactory';
import { PostService } from '../../../src/post/PostService';
import { PostStatus } from '@app/entity/post/type/PostType';
import { LocalDateTime } from '@js-joda/core';
import { ForbiddenException } from '@nestjs/common';
import { PostFindOnePublishRequest } from '../../../src/post/dto/PostFindOnePublishRequest';

describe('PostService (int)', () => {
  let orm: MikroORM;
  let postService: PostService;
  let postFactory: PostFactory;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [getMikroOrmTestModule(), PostModule],
      providers: [PostService, PostQueryRepository],
    }).compile();

    orm = module.get<MikroORM>(MikroORM);
    postFactory = new PostFactory(orm.em);
    postService = module.get<PostService>(PostService);
    await orm.getSchemaGenerator().updateSchema();
  });

  beforeEach(async () => await orm.getSchemaGenerator().clearDatabase());

  afterAll(async () => await orm.close(true));

  describe('findOnePublished', () => {
    it('id에 해당하는 공개된 포스트가 없을 경우 에러가 발생한다.', async () => {
      // given
      const post = await postFactory.createOne({
        status: PostStatus.DRAFT,
      });
      const request = new PostFindOnePublishRequest();
      request.id = post.id;

      // when
      const findOne = async () => postService.findOnePublish(request);

      await expect(findOne).rejects.toThrowError(ForbiddenException);
    });
    it('id에 해당하는 공개된 포스트를 조회한다.', async () => {
      // given
      const post = await postFactory.createOne({
        status: PostStatus.PUBLISH,
        publishedAt: LocalDateTime.now(),
      });
      const request = new PostFindOnePublishRequest();
      request.id = post.id;

      // when
      const result = await postService.findOnePublish(request);

      // then
      expect(result.id).toBe(post.id);
      expect(result.status).toBe(PostStatus.PUBLISH);
    });
  });
});
