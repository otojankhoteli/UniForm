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
