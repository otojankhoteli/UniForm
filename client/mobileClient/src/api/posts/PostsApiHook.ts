import { usePostApi, usePostApiWithAuth } from "../shared/ApiHook";
import { CreatePostRequest } from "./PostsApiModel";
import { CreatePostUri } from "./PostsApiUri";

export function usePostCreate() {
  return usePostApiWithAuth<CreatePostRequest>(CreatePostUri);
}