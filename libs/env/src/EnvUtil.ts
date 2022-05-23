import { readFileSync } from 'fs';

import { DynamicModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import * as yaml from 'js-yaml';

import { Environment } from './Environment';

export class EnvUtil {
  private static env?: Environment;

  static getConfigModule(): DynamicModule {
    return ConfigModule.forRoot({
      isGlobal: true,
      load: [() => EnvUtil.getEnvFrom()],
    });
  }

  static getEnv(nodeEnv?: string): Environment {
    if (EnvUtil.env) {
      return EnvUtil.env;
    }

    const environment = EnvUtil.getEnvFrom(nodeEnv);
    EnvUtil.env = EnvUtil.validate(environment);

    return EnvUtil.env;
  }

  private static getEnvFrom(nodeEnv = process.env.NODE_ENV) {
    const suffix = !nodeEnv || nodeEnv === 'test' ? 'local' : nodeEnv;

    const load = yaml.load(readFileSync(`env/env.${suffix}.yml`, 'utf8'));

    return plainToInstance(Environment, load, {
      enableImplicitConversion: false,
    });
  }

  private static validate(config: Environment) {
    const errors = validateSync(config, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      throw new Error(errors.toString());
    }

    return config;
  }
}
