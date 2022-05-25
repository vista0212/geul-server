import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import mikroOrmConfig from '@app/entity/config/mikro-orm.config';
import { PostAppModule } from './post/PostAppModule';

@Module({
  imports: [MikroOrmModule.forRoot(mikroOrmConfig), PostAppModule],
})
export class AppModule {}
