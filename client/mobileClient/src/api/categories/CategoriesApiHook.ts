import { GetCategoriesResponse, CategoryViewModel } from "./CategoriesApiModel";
import {
  CategoriesByNameUri,
  CreateCategoryUri,
  SubscribeCategoryUri,
  UnsubscribeCategoryUri,
  CategoryByIdUri,
  SubscribedCategoriesUri,
} from "./CategoriesApiUri";
import {
  useGetApi,
  GetRequestOptions,
  usePostApi,
  usePostApiWithAuth,
} from "../shared/ApiHook";
import { HashtagViewModel } from "../hashtags/HashtagsApiModel";
import { EmptyRequest, EmptyResponse } from "../shared/ApiResponse";

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

export function useCategoryById(categoryId: string) {
  console.log("useCategoryById", categoryId);
  return useGetApi<CategoryViewModel>(CategoryByIdUri(categoryId), true, {
    wait: false,
    info: {
      limit: 15,
      queryParams: [],
      skip: 0,
    },
  });
}

export function useSubscribeCategory(categoryId: string) {
  return usePostApiWithAuth<EmptyRequest, EmptyResponse>(
    SubscribeCategoryUri(categoryId)
  );
}

export function useUnsubscribeCategory(categoryId: string) {
  return usePostApiWithAuth<EmptyRequest, EmptyResponse>(
    UnsubscribeCategoryUri(categoryId)
  );
}

export function useSubscribedCategories(userId: string) {
  return useGetApi<CategoryViewModel[], CategoryViewModel>(
    SubscribedCategoriesUri,
    true,
    {
      wait: false,
      info: {
        limit: 0,
        queryParams: [{ key: "profileId", value: userId }],
        skip: 0,
      },
    }
  );
}
