export interface IAuthenticatedUser {
  _id: string;
  email: string;
  refreshToken: string;
  expirationDate: Date;
}