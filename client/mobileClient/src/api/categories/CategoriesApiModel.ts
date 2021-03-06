import { UserViewModel } from "../users/UsersApiModel";

export type GetCategoriesResponse = CategoryViewModel[];
export interface CategoryViewModel {
  id: string;
  isSubscribed: boolean;
  isVerified: boolean;
  author: UserViewModel;
  name: string;
  description: string;
  imgUrl: string;
  memberCount: number;
  postCount: number;
}
