import { GetCategoriesResponse, CategoryViewModel } from "./CategoriesApiModel";
import { CategoriesByNameUri, CreateCategoryUri } from "./CategoriesApiUri";
import {
  useGetApi,
  GetRequestOptions,
  usePostApi,
  usePostApiWithAuth,
} from "../shared/ApiHook";
import { HashtagViewModel } from "../hashtags/HashtagsApiModel";

const initialRequestInfo: GetRequestOptions<CategoryViewModel> = {
  wait: false,
  info: {
    limit: 15,
    queryParams: [],
    skip: 0,
  },
};
export function useCategoriesByName() {
  return useGetApi<GetCategoriesResponse, CategoryViewModel>(
    CategoriesByNameUri,
    true,
    initialRequestInfo
  );
}

export function useCreateCategory() {
  return usePostApiWithAuth<CategoryViewModel, any>(CreateCategoryUri);
}
