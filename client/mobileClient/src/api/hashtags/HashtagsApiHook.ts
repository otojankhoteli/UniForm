import { GetHashtagsResponse, HashtagViewModel } from "./HashtagsApiModel";
import { useGetApi, GetRequestOptions } from "../shared/ApiHook";
import { HashtagByNameUri } from "./HashtagApiUri";

const initialRequestInfo: GetRequestOptions<HashtagViewModel> = {
  wait: false,
  info: {
    limit: 5,
    queryParams: [],
    skip: 0
  }
}
export function useHashtagByName() {
  return useGetApi<GetHashtagsResponse, HashtagViewModel>(HashtagByNameUri, true, initialRequestInfo);
}