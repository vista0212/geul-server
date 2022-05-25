import { Test } from '@nestjs/testing';
import { PostQueryRepository } from '../../../src/post/PostQueryRepository';
import { MikroORM } from '@mikro-orm/core';
import { Post } from '@app/entity/post/Post.entity';
import { PostStatus } from '@app/entity/post/type/PostType';
import { PostModule } from '@app/entity/post/PostModule';
import { getMikroOrmTestModule } from '@app/entity/config/getMikroOrmTestModule';

describe('PostQueryRepository (int)', () => {
  let postQueryRepository: PostQueryRepository;
  let orm: MikroORM;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [getMikroOrmTestModule(), PostModule],
      providers: [PostQueryRepository],
    }).compile();

    orm = module.get<MikroORM>(MikroORM);
    postQueryRepository = module.get<PostQueryRepository>(PostQueryRepository);
  });

  beforeEach(async () => orm.getSchemaGenerator().clearDatabase());

  afterAll(async () => orm.close(true));

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
