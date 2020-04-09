export type ApiMethodType = "post" | "put" | "delete" | "get"

export interface SignUpRequest {
  googleAccessToken: string;
}
export interface SignUpResponse {
  token: string;
  refreshToken: string;
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