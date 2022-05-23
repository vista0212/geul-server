import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import mikroOrmConfig from '@app/entity/config/mikro-orm.config';
import { PostModule } from '@app/entity/post/PostModule';

@Module({
  imports: [MikroOrmModule.forRoot(mikroOrmConfig), PostModule],
})
export class AppModule {}
