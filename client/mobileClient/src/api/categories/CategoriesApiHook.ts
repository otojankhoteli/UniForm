import { GetCategoriesResponse } from "./CategoriesApiModel";
import { CategoriesByNameUri } from "./CategoriesApiUri";
import { useGetApi } from "../shared/ApiHook";

export function useCategoriesByName(){
  return useGetApi<GetCategoriesResponse>(CategoriesByNameUri);
}