import { Page } from './Common';

export interface IHashTag {
  name: string,
}

export interface IHashTagSearchModel extends IHashTag, Page {
}
