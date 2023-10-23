import { getWinstonLoggerOption } from '@app/logger/getWinstonLoggerOption';
import { DynamicModule } from '@nestjs/common';
import { createLogger } from 'winston';

import { Logger } from './Logger';

export class LoggerModule {
  static register(moduleName: string): DynamicModule {
    return {
      global: true,
      module: LoggerModule,
      providers: [
        {
          provide: Logger,
          useFactory: () => createLogger(getWinstonLoggerOption(moduleName)),
        },
      ],
      exports: [Logger],
    };
  }
}
