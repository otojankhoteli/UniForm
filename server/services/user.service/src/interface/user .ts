import { Page } from "./Common";

export interface IUser {
  _id: string;
  name: string;
  surname: string;
  email: string;
  photoURL: string;
  role: string;
}


export interface UserSearchOptions extends Page {
  name: string;
}
export interface UserSearchResultViewModel {
  id: string;
  name: string;
  surname: string;
  email: string;
  photoURL: string;
  role: string;
}