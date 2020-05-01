import { usePostApi } from "../shared/ApiHook";
import { CreatePostRequest } from "./PostsApiModel";
import { CreatePostUri } from "./PostsApiUri";

export function usePostCreate() {
  return usePostApi<CreatePostRequest>(CreatePostUri);
}