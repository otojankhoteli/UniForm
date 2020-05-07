import { useGetApi, GetRequestOptions } from "../shared/ApiHook";
import { GetUsersByEmailResponse, UserViewModel } from "./UsersApiModel";
import { UsersByEmailUri } from "./UsersApiUri";


const initialRequestInfo: GetRequestOptions<UserViewModel> = {
  wait: false,
  info: {
    limit: 5,
    queryParams: [],
    skip: 0
  }
}
export function useUsersByEmail() {
  return useGetApi<GetUsersByEmailResponse, UserViewModel>(UsersByEmailUri, true, initialRequestInfo);
}