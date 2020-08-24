import { EmptyRequest, EmptyResponse } from "../shared/ApiResponse";
import { User } from "../auth/AuthApiModel";
import { UserViewModel } from "../users/UsersApiModel";

export interface CreatePostRequest {
  categoryId: string;
  hashTags: string[];
  userTags: string[];
  text: string;
}

export type GetPostsResponse = PostViewModel[];

export interface PostViewModel {
  id: string;
  text: string;
  authorId: string;
  authorUsername: string;
  authorProfilePic?: string;
  voteCount: number;
  categoryName: string;
  categoryId: string;
  isUpvoted: boolean;
  isDownvoted: boolean;
  isJoined: boolean;
  createdAt?: string;
  files: string[];
}

export interface CommentViewModel {
  id: string;
  author: UserViewModel;
  text: string;
  userTags: string[];
  post: string;
  upVoters: string[];
  downVoters: string[];
  voteCount: number;
}
