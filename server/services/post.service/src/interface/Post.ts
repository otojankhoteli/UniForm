import {Page, PageResponse, LogDates} from './Common';



export interface IPost extends LogDates{
  _id: string,
  author: any,
  type: string,
  text: string,
  files: string[],
  hashTags: string[],
  userTags: any[],
  category: any,
  upVoters: string[],
  downVoters: string[],
  voteCount: number,

}

export interface IPostPage extends PageResponse {
  docs: IPost[]
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
export interface PostResponse {
  id: string;
  text: string;
  authorId: string;
  authorUsername: string;
  authorProfilePic: string;
  voteCount: number;
  categoryName: string;
  categoryId: string;
  userTags: PostUser[];
  // userTags: any,
  isUpvoted: boolean;
  isDownvoted: boolean;
  createdAt: string;
  files: string[];
}

export interface FeedPostResponsePage extends PageResponse {
  docs: PostResponse[]
}

export interface PostUser {
  _id: string
  name: string;
  imgUrl: string
}


export interface PostSearch extends Page {
  userId: string,
  text: string
}
