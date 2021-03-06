import { PostHost } from "../shared/ApiUri";

export const CreatePostUri = `${PostHost}post`;
export const GetFeedUri = `${PostHost}user/feed`;
export const GetPostUri = (postId: string) => `${PostHost}post/${postId}`;
export const PostSearchByTermUri = `${PostHost}post/search`;
export const UpvoteUri = (postId: string) =>
  `${PostHost}post/${postId}/_upvote`;
export const DownvoteUri = (postId: string) =>
  `${PostHost}post/${postId}/_downvote`;
export const UnreactUri = (postId: string) =>
  `${PostHost}post/${postId}/_unreact`;

export const CategoryPostUri = `${PostHost}category/posts`;

export const UserPostsUri = `${PostHost}user/activity/posts`;
