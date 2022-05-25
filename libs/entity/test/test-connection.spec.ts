import { MikroORM } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { Test } from '@nestjs/testing';
import { getMikroOrmTestModule } from '@app/entity/config/getMikroOrmTestModule';
import { PostModule } from '@app/entity/post/PostModule';

describe('DB test Connection', () => {
  let entityManager: EntityManager;
  let orm: MikroORM;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [getMikroOrmTestModule(), PostModule],
    }).compile();

    entityManager = module.get<EntityManager>(EntityManager);
    orm = module.get<MikroORM>(MikroORM);
    await orm.getSchemaGenerator().updateSchema();
  });

  beforeEach(async () => await orm.getSchemaGenerator().clearDatabase());

  afterAll(async () => await orm.close(true));

  it('test DB 연동 테스트', async () => {
    const [result] = await entityManager.execute('SELECT 1');

    expect(result['?column?']).toBe(1);
  });
});
