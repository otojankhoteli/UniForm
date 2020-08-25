export interface IUser {
  _id: string,
  deviceId: string,
  name: string,
  email: string,
  role: string,
  imgUrl: string,
  voteCount: number,
  subscribedCategories: string[]
}

export interface IUserSearchModel {
  _id: string,
  email: string,
}

export interface MQUserModel {
  _id: string;
  name: string;
  surname: string;
  email: string;
  photoURL: string;
  role: string;
  deviceId: string,
}
