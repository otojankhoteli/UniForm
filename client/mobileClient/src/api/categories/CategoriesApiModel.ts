export type GetCategoriesResponse = CategoryViewModel[];
export interface CategoryViewModel {
  id: string;
  isVerified: boolean;
  author: string;
  name: string;
  description: string;
  memberCount: number;
  postCount: number;
}
