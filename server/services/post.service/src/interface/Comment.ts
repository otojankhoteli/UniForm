import {PostUser} from './Post';
import {LogDates} from './Common';

export interface IComment extends LogDates{
  _id: string,
  author: any,
  post: any,
  text: string,
  files: string[],
  userTags: any[],
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
}

export interface CommentResponse extends LogDates {
  id: string;
  text: string;
  authorId: string;
  authorUsername: string;
  authorProfilePic: string;
  voteCount: number;
  userTags: PostUser[];
  isUpvoted: boolean;
  isDownvoted: boolean;
  createdAt: string;
  files: string[];
}
