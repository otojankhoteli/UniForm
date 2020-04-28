import { User } from "../../api/auth/AuthApiModel";

export interface PersistAccount {
  token: string;
  refreshToken: string;
  user: User;
}