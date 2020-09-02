import {Page} from './Common';

export interface ICategoryDTO {
  id: string;
  author: any,
  name: string,
  description: string,
  memberCount: number,
  postCount: number,
  isSubscribed: boolean,
  imgUrl: string,
  isVerified: boolean,
}

export interface ICategorySearchModel extends Page {
  name: string,
}
