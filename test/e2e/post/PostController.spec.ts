import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../../src/AppModule';
import { setNestApp } from '@app/web-common/app/setNestApp';
import { MikroORM } from '@mikro-orm/core';

describe('PostController (e2e)', () => {
  let app: INestApplication;
  let orm: MikroORM;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    orm = module.get<MikroORM>(MikroORM);
    setNestApp(app);
    await app.init();
  });

  beforeEach(async () => await orm.getSchemaGenerator().clearDatabase());

  afterAll(async () => app.close());

  describe('POST /api/post', () => {
    it('title과 body가 string 타입이 아닌 경우 에러가 발생한다.', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/post')
        .send({ title: 1, body: 1 });

      expect(response.status).toBe(400);
    });
  });
});
