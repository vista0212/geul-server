import { Factory, faker } from '@mikro-orm/seeder';
import { Post } from '@app/entity/post/Post.entity';
import { PostStatus } from '@app/entity/post/type/PostType';

export class PostFactory extends Factory<Post> {
  model = Post;

  static createEntity(entity?: Partial<Post>): Post {
    return Object.assign(new Post(), {
      title: faker.datatype.string(),
      body: faker.datatype.string(),
      status: faker.helpers.arrayElement(Object.values(PostStatus)),
      viewCount: 0,
      ...entity,
    } as Post);
  }

  definition(): Partial<Post> {
    return PostFactory.createEntity();
  }
}
