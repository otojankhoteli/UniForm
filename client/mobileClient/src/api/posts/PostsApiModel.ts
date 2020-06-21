import { EmptyRequest, EmptyResponse } from "../shared/ApiResponse";

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
