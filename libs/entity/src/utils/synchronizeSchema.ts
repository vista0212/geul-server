import { MikroORM } from '@mikro-orm/core';

async function synchronizeSchema(orm: MikroORM) {
  const generator = orm.getSchemaGenerator();

  /**
   * db schema 일괄 삭제, 생성, 수정
   */
  await generator.dropSchema();
  await generator.createSchema();
  await generator.updateSchema();

  // in tests it can be handy to use those:
  await generator.refreshDatabase(); // ensure db exists and is fresh
  await generator.clearDatabase(); // removes all data
}

export default synchronizeSchema;
