import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EnvUtil } from '@app/env/EnvUtil';
import { DynamicModule } from '@nestjs/common';

const env = EnvUtil.getEnv().database;

export function getMikroOrmTestModule(): DynamicModule {
  return MikroOrmModule.forRoot({
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
    allowGlobalContext: true,
    autoLoadEntities: true,
    schemaGenerator: {
      disableForeignKeys: true,
      createForeignKeyConstraints: false,
    },
    debug: false,
  });
}
