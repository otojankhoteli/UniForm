import {Page} from './Common';

export interface ICategoryDTO {
  id: string;
  author: any,
  name: string,
  description: string,
  memberCount: number,
  postCount: number,
  imgUrl: string,
  isSubscribed: boolean,
  isVerified: boolean,
}

export interface ICategorySearchModel extends Page {
  name: string,
}
