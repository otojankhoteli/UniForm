export interface IPost {
  _id: string,
  author: any,
  type: string,
  text: string,
  files: string[],
  hashTags: string[],
  userTags: string[],
  category: any,
  upVoters: string[],
  downVoters: string[],
  voteCount: number,
  createdAt?: string,
  updatedAt?: string,
}
export interface UpsertPostRequest {
  id?:string;
  authorId: string;
  categoryId: string;
  hashTags: string[],
  userTags: string[],
  text: string,
  files: string[],
}
export interface FeedPostResponse {
  id: string;
  text: string;
  authorId: string;
  authorUsername: string;
  authorProfilePic: string;
  voteCount: number;
  categoryName: string;
  categoryId: string;
  isUpvoted: boolean;
  isDownvoted: boolean;
  createdAt: string;
  files: string[];
}
