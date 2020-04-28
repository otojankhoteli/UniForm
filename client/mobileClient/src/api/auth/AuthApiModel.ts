export type ApiMethodType = "post" | "put" | "delete" | "get"

export interface SignUpRequest {
  googleClientId: string;
  googleAccessToken: string;
  deviceId: string;
}
export interface SignUpResponse {
  token: string;
  refreshToken: string;
  user: User;
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