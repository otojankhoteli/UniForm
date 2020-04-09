export interface ISignUpUserInputDTO {
  name: string;
  email: string;
  refreshToken: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: string;
}