import { User } from "../../api/auth/AuthApiModel";
import { UserViewModel } from "../../api/users/UsersApiModel";

export interface PersistAccount {
  token: string;
  refreshToken: string;
  user: UserViewModel;
}
