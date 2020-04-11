import {Page} from './Common';

export interface ICategory {
  author: string,
  name: string,
  memberCount: number,
  isMain: boolean,
}

export interface ICategorySearchModel extends Page {
  name: string,
}
