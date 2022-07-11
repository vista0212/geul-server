import { Test } from '@nestjs/testing';
import { PostQueryRepository } from '../../../src/post/PostQueryRepository';
import { MikroORM } from '@mikro-orm/core';
import { Post } from '@app/entity/post/Post.entity';
import { PostStatus } from '@app/entity/post/type/PostType';
import { PostModule } from '@app/entity/post/PostModule';
import { getMikroOrmTestModule } from '@app/entity/config/getMikroOrmTestModule';
import { PostFactory } from '../../utils/entityFactory/PostFactory';
import { PostFindRequest } from '../../../src/post/dto/PostFindRequest';
import { LocalDateTime } from '@js-joda/core';

describe('PostQueryRepository (int)', () => {
  let postQueryRepository: PostQueryRepository;
  let orm: MikroORM;
  let postFactory: PostFactory;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [getMikroOrmTestModule(), PostModule],
      providers: [PostQueryRepository],
    }).compile();

    orm = module.get<MikroORM>(MikroORM);
    postFactory = new PostFactory(orm.em);
    postQueryRepository = module.get<PostQueryRepository>(PostQueryRepository);
  });

  beforeEach(async () => await orm.getSchemaGenerator().refreshDatabase());

  afterAll(async () => await orm.close(true));

  describe('findOne', () => {
    it('id에 해당하는 포스트를 조회한다.', async () => {
      // given
      const post = await postFactory.createOne();

      // when
      const result = await postQueryRepository.findOne(post.id);

      // then
      expect(result.id).toBe(post.id);
    });
  });

  describe('find', () => {
    it('published 상태의 포스트들을 조회한다.', async () => {
      // given
      await postFactory.createOne({
        status: PostStatus.PUBLISH,
        publishedAt: LocalDateTime.now(),
      });

      // when
      const result = await postQueryRepository.find(
        new PostFindRequest(),
        LocalDateTime.now(),
      );

      // then
      expect(result[0].status).toBe(PostStatus.PUBLISH);
    });

    it('published 상태가 아닌 포스트는 조회하지 않는다.', async () => {
      // given
      await postFactory.createOne({
        status: PostStatus.DRAFT,
        publishedAt: LocalDateTime.now(),
      });

      // when
      const result = await postQueryRepository.find(
        new PostFindRequest(),
        LocalDateTime.now(),
      );

      // then
      expect(result).toHaveLength(0);
    });

    it('lastId보다 id가 작은 포스트들을 조회한다.', async () => {
      // given
      await postFactory.createOne({
        status: PostStatus.PUBLISH,
        publishedAt: LocalDateTime.now(),
      });
      await postFactory.createOne({
        id: 10,
        status: PostStatus.PUBLISH,
        publishedAt: LocalDateTime.now(),
      });
      const request = new PostFindRequest();
      request.lastId = 10;

      // when
      const result = await postQueryRepository.find(
        request,
        LocalDateTime.now(),
      );

      // then
      expect(result).toHaveLength(1);
    });
    //
    // it('태그를 포함하는 포스트들을 조회한다.', async () => {
    //   // given
    //   await postFactory.createOne({
    //     status: PostStatus.PUBLISHED,
    //   });
    //   await postFactory.createOne({
    //     id: 10,
    //     status: PostStatus.PUBLISHED,
    //   });
    //
    //   // when
    //   const result = await postQueryRepository.find(10);
    //
    //   // then
    //   expect(result).toHaveLength(0);
    // });
  });

  describe('create', () => {
    it('draft 상태의 포스트를 생성한다.', async () => {
      // given
      const expectedTitle = 'title';
      const expectedBody = 'body';
      const post = Post.createDraft(expectedTitle, expectedBody);

      // when
      await postQueryRepository.create(post);

      // then
      const result = await orm.em.findOneOrFail(Post, { title: expectedTitle });
      expect(result.title).toBe(expectedTitle);
      expect(result.body).toBe(expectedBody);
      expect(result.status).toBe(PostStatus.DRAFT);
    });
  });
});
