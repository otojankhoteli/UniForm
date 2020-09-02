import { PostHost } from "../shared/ApiUri";

export const CategoriesByNameUri = `${PostHost}category`;
export const CreateCategoryUri = `${PostHost}category`;
export const SubscribeCategoryUri = (id: string) => `${PostHost}category/${id}/_subscribe`;
export const UnsubscribeCategoryUri = (id: string) => `${PostHost}category/${id}/_unsubscribe`;
export const CategoryByIdUri = (id: string) => `${PostHost}category/${id}`;
