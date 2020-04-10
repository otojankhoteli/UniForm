import { GetHashtagsResponse } from "./HashtagsApiModel";
import { useGetApi } from "../shared/ApiHook";
import { HashtagByNameUri } from "./HashtagApiUri";

export function useHashtagByName(){
  return useGetApi<GetHashtagsResponse>(HashtagByNameUri);
}