export interface IComment {
  _id: string,
  author: string,
  type: string,
  text: string,
  files: string[],
  userTags: string[],
  upVoters: string[],
  downVoters: string[],
  voteCount: number,
}
export interface UpsertCommentRequest {
  id?: string;
  authorId: string;
  postId: string;
  userTags: string[],
  text: string,
  files: string[],
}
interface FeedPostResponse extends IComment {
  react: string,
}
