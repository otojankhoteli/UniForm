import {Page} from './Common';

export interface ICategoryDTO {
  id: string;
  author: string,
  name: string,
  description: string,
  memberCount: number,
  postCount: number,
  isVerified: boolean,
}

export interface ICategorySearchModel extends Page {
  name: string,
}
