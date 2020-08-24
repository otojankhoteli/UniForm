import { UserViewModel } from "../users/UsersApiModel";

export type GetCategoriesResponse = CategoryViewModel[];
export interface CategoryViewModel {
  id: string;
  isVerified: boolean;
  author: UserViewModel;
  name: string;
  description: string;
  photoUri: string;
  memberCount: number;
  postCount: number;
}
