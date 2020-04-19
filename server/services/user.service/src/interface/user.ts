export interface ISignUpUserInputDTO {
  name: string;
  surname: string;
  email: string;
  photoURL: string;
  refreshToken: string;
}

export interface IUser {
  _id: string;
  name: string;
  surname: string;
  email: string;
  photoURL: string;
  role: string;
}
