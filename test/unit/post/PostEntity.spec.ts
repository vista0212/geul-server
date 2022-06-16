import { Post } from '@app/entity/post/Post.entity';
import { LocalDateTime } from '@js-joda/core';
import { PostStatus } from '@app/entity/post/type/PostType';

describe('PostEntity (unit)', () => {
  describe('isPublish', () => {
    it('게시글 상태가 PUBLISH 상태가 아니라면 false를 반환한다.', () => {
      const post = new Post();
      post.publishedAt = LocalDateTime.now();

      expect(post.isPublish(post.publishedAt.plusDays(1))).toBe(false);
    });

    it('게시글 상태가 PUBLISH 상태이지만, 공개 일자가 now보다 나중이라면 false를 반환한다.', () => {
      const post = new Post();
      const now = LocalDateTime.now();
      post.status = PostStatus.PUBLISH;
      post.publishedAt = now.plusDays(1);

      expect(post.isPublish(now)).toBe(false);
    });

    it('게시글 상태가 PUBLISH 상태이면서, 공개 일자가 now보다 이전이라면 true를 반환한다.', () => {
      const post = new Post();
      post.publishedAt = LocalDateTime.now();
      post.status = PostStatus.PUBLISH;

      expect(post.isPublish(post.publishedAt.plusDays(1))).toBe(true);
    });
  });
});
