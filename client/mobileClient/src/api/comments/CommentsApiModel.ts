import { UserViewModel } from "../users/UsersApiModel";

export interface CreateCommentRequest {
  authorId: string;
  postId: string;
  userTags: string[];
  text: string;
}

export type GetCommentsResponse = CommentViewModel[];

interface User {
  _id: string;
  name: string;
  imgUrl: string;
}

export interface CommentViewModel {
  id: string;
  text: string;
  authorId: string;
  authorUsername: string;
  authorProfilePic: string;
  voteCount: number;
  userTags: User[];
  isUpvoted: boolean;
  isDownvoted: boolean;
  createdAt: string;
  updatedAt: string;
  files: string[];
}
