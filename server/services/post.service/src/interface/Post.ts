import {Page, PageResponse} from './Common';

export interface IPost {
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
  createdAt?: string,
  updatedAt?: string,
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
  userTags: {
    id: string;
    name: string;
  }[];
  // userTags: any,
  isUpvoted: boolean;
  isDownvoted: boolean;
  createdAt: string;
  files: string[];
}

export interface FeedPostResponsePage extends PageResponse {
  docs: PostResponse[]
}

interface PostUser {
  _id: string
  name: string;
  imgUrl: string
}


export interface PostSearch extends Page {
  userId: string,
  search: string
}
