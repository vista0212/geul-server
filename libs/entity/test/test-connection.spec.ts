import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { Test } from '@nestjs/testing';

import mikroOrmConfig from '../src/config/mikro-orm.config';

describe('DB test Connection', () => {
  let entityManager: EntityManager;
  let orm: MikroORM;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [MikroOrmModule.forRoot(mikroOrmConfig)],
    }).compile();

    entityManager = module.get<EntityManager>(EntityManager);
    orm = module.get<MikroORM>(MikroORM);
  });

  beforeEach(async () => await orm.getSchemaGenerator().refreshDatabase());

  afterAll(async () => await orm.close(true));

  it('test DB 연동 테스트', async () => {
    const [result] = await entityManager.execute('SELECT 1');

    expect(result['?column?']).toBe(1);
  });
});
