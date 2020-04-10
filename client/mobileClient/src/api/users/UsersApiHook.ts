import { useGetApi } from "../shared/ApiHook";
import { GetUsersByEmailResponse } from "./UsersApiModel";
import { UsersByEmailUri } from "./UsersApiUri";

export function useUsersByEmail(){
  return useGetApi<GetUsersByEmailResponse>(UsersByEmailUri);
}