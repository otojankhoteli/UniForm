import {Page} from './Common';

export interface ICategoryDTO {
  author: string,
  name: string,
  memberCount: number,
  postCount: number,
  isMain: boolean,
}

export interface ICategorySearchModel extends Page {
  name: string,
}
