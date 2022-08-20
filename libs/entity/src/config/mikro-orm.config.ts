import { EnvUtil } from '@app/env/EnvUtil';
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

const env = EnvUtil.getEnv().database;

const config: MikroOrmModuleOptions = {
  type: 'postgresql',
  dbName: env.name,
  host: env.host,
  password: env.password,
  user: env.user,
  port: env.port,
  metadataProvider: TsMorphMetadataProvider,
  entities: ['dist/libs/entity/src/**/*.entity.js'],
  entitiesTs: ['libs/entity/src/**/*.entity.ts'],
  pool: {
    min: 1,
    max: 5,
  },
  autoLoadEntities: true,
  schemaGenerator: {
    disableForeignKeys: true,
    createForeignKeyConstraints: false,
  },
  allowGlobalContext: true,
  debug: true,
};

export default config;
