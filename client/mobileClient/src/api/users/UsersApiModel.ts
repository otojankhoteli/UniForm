import { Role } from "../auth/AuthApiModel";

export type GetUsersByEmailResponse = ProfileUserViewModel[];
export interface UserViewModel {
  _id: string;
  name: string;
  surname: string;
  email: string;
  photoURL: string;
  role: Role;
}

export interface ProfileUserViewModel {
  _id: string;
  deviceId: string;
  name: string;
  email: string;
  role: string;
  imgUrl: string;
  voteCount?: number;
  subscribedCategories?: string[];
}
