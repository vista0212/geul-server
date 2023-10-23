import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import mikroOrmConfig from '@app/entity/config/mikro-orm.config';
import { PostAppModule } from './post/PostAppModule';
import { LoggerModule } from '@app/logger/LoggerModule';

@Module({
  imports: [
    MikroOrmModule.forRoot(mikroOrmConfig),
    LoggerModule.register('api'),
    PostAppModule,
  ],
})
export class AppModule {}
