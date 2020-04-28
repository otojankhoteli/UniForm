export type GetCategoriesResponse = CategoryViewModel[];
export interface CategoryViewModel {
  id: string;
  name: string;
  isVerified: boolean;
}