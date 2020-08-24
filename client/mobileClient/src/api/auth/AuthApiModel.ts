import { UserViewModel } from "../users/UsersApiModel";

export type ApiMethodType = "post" | "put" | "delete" | "get";

export interface SignUpRequest {
  accessToken: string;
  deviceId: string;
}
export interface SignUpResponse {
  token: string;
  refreshToken: string;
  user: UserViewModel;
}
export type Role = "student" | "academicAuthority";
export interface User {
  _id: string;
  role: Role;
  photoURL?: string;
  firstName?: string;
  lastName?: string;
  email: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
  expiredToken: string;
}
export interface RefreshTokenResponse {
  token: string;
}
