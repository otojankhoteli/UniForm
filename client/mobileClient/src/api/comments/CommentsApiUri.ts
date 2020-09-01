import { PostHost } from "../shared/ApiUri";

export const GetCommentsUri = `${PostHost}comment`;
export const GetCommentUri = (commentId: string) =>
  `${PostHost}comment/${commentId}`;
export const CreateCommentUri = `${PostHost}comment`;
export const UpdateCommentUri = (commentId: string) =>
  `${PostHost}comment/${commentId}`;
export const UpvoteUri = (commentId: string) =>
  `${PostHost}comment/${commentId}/_upvote`;
export const DownvoteUri = (commentId: string) =>
  `${PostHost}comment/${commentId}/_downvote`;
export const UnReactUri = (commentId: string) =>
  `${PostHost}comment/${commentId}/_unreact`;
