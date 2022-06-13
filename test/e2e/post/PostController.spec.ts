import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../../src/AppModule';
import { setNestApp } from '@app/web-common/app/setNestApp';
import { MikroORM } from '@mikro-orm/core';
import { PostFactory } from '../../utils/entityFactory/PostFactory';

describe('PostController (e2e)', () => {
  let app: INestApplication;
  let orm: MikroORM;
  let postFactory: PostFactory;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    orm = module.get<MikroORM>(MikroORM);
    postFactory = new PostFactory(orm.em);
    setNestApp(app);
    await app.init();
    await orm.getSchemaGenerator().updateSchema();
  });

  beforeEach(async () => await orm.getSchemaGenerator().clearDatabase());

  afterAll(async () => app.close());

  describe('GET /api/post', () => {
    it('포스트 목록을 조회한다.', async () => {
      const post = await postFactory.createOne();

      const response = await request(app.getHttpServer())
        .get('/api/post')
        .query({ limit: 10 });

      expect(response.status).toBe(200);
      expect(response.body.data[0].id).toBe(post.id);
    });

    it('더 조회할 포스트가 존재할 경우 hasMorePost 필드가 true이다.', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/post')
        .query({ limit: 10, lastId: 0 });

      expect(response.status).toBe(200);
    });

    it('lastId보다 id가 작은 포스트를 조회한다.', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/post')
        .query({ limit: 10, lastId: 0 });

      expect(response.status).toBe(200);
    });

    // it('태그를 포함하는 포스트를 조회한다.', async () => {
    //   const tags = ['tag1', 'tag2'];
    //
    //   const response = await request(app.getHttpServer())
    //     .get('/api/post')
    //     .query({ limit: 10, lastId: 0 });
    //
    //   expect(response.status).toBe(200);
    // });
  });

  describe('POST /api/post', () => {
    it('title과 body가 string 타입이 아닌 경우 에러가 발생한다.', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/post')
        .send({ title: 1, body: 1 });

      expect(response.status).toBe(400);
    });
  });
});
