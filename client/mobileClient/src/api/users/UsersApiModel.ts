import { Role } from "../auth/AuthApiModel";

export type GetUsersByEmailResponse = UserViewModel[];
export interface UserViewModel {
  _id: string;
  name: string;
  surname: string;
  email: string;
  photoURL: string;
  role: Role;
}
