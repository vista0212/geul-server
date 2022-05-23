import { EnvUtil } from '@app/env/EnvUtil';
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';

const env = EnvUtil.getEnv().database;

const config: MikroOrmModuleOptions = {
  type: 'postgresql',
  dbName: env.name,
  host: env.host,
  password: env.password,
  user: env.user,
  port: env.port,
  pool: {
    min: 1,
    max: 5,
  },
  autoLoadEntities: true,
  entities: [
    'libs/entity/src/**/*.entity.ts',
    'libs/entity/src/BaseTimeEntity.ts',
  ],
  entitiesTs: [
    'libs/entity/src/**/*.entity.ts',
    'libs/entity/src/BaseTimeEntity.ts',
  ],
  schemaGenerator: {
    disableForeignKeys: true,
    createForeignKeyConstraints: false,
  },
  debug: true,
};

export default config;
