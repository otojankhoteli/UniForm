export interface IUser {
  _id: string,
  name: string,
  email: string,
  role: string,
  imgUrl: string,
  subscribedCategories: string[]
}

export interface IUserSearchModel {
  _id: string,
  email: string,
}
