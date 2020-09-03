export interface CreatePostRequest {
  categoryId: string;
  hashTags: string[];
  userTags: string[];
  text: string;
  files: string[];
}

export type GetPostsResponse = PostViewModel[];

export interface PostViewModel {
  id: string;
  text: string;
  authorId: string;
  authorUsername: string;
  authorProfilePic?: string;
  voteCount: number;
  commentCount: number;
  categoryName: string;
  categoryId: string;
  isUpvoted: boolean;
  isDownvoted: boolean;
  isJoined: boolean;
  createdAt?: string;
  files: string[];
}
