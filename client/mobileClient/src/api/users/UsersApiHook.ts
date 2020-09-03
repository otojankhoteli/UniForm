import { useGetApi, GetRequestOptions } from "../shared/ApiHook";
import {
  GetUsersByEmailResponse,
  UserViewModel,
  ProfileUserViewModel,
} from "./UsersApiModel";
import { UsersByEmailUri, GetUserByIdUri } from "./UsersApiUri";

const initialRequestInfo: GetRequestOptions<UserViewModel> = {
  wait: false,
  info: {
    limit: 5,
    queryParams: [],
    skip: 0,
  },
};
export function useUsersByEmail() {
  return useGetApi<GetUsersByEmailResponse, UserViewModel>(
    UsersByEmailUri,
    true,
    initialRequestInfo
  );
}

export function useGetUserById(userId: string) {
  return useGetApi<ProfileUserViewModel, ProfileUserViewModel>(
    GetUserByIdUri,
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
