import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../../src/AppModule';
import { setNestApp } from '@app/web-common/app/setNestApp';

describe('PostController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    setNestApp(app);
    await app.init();
  });

  describe('POST /api/post', () => {
    it('title과 body가 string 타입이 아닌 경우 에러가 발생한다.', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/post')
        .send({ title: 1, body: 1 });

      console.log(response.body);
      expect(response.status).toBe(400);
    });
  });
});
