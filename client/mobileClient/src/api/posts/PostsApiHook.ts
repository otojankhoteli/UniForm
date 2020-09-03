import {
  usePostApiWithAuth,
  useGetApi,
  GetApiHookResult,
  usePostApi,
} from "../shared/ApiHook";
import {
  CreatePostRequest,
  GetPostsResponse,
  PostViewModel,
} from "./PostsApiModel";
import {
  CreatePostUri,
  GetFeedUri,
  DownvoteUri,
  UpvoteUri,
  CategoryPostUri,
  UserPostsUri,
  PostSearchByTermUri,
  UnreactUri,
  GetPostUri,
} from "./PostsApiUri";
import { EmptyRequest, EmptyResponse } from "../shared/ApiResponse";

export function usePostCreate() {
  return usePostApiWithAuth<CreatePostRequest>(CreatePostUri);
}

export function useFeed() {
  return useGetApi<GetPostsResponse, PostViewModel>(GetFeedUri);
}

export function useUpvote(postId: string) {
  return usePostApiWithAuth<EmptyRequest, EmptyResponse>(UpvoteUri(postId));
}

export function useDownvote(postId: string) {
  return usePostApiWithAuth<EmptyRequest, EmptyResponse>(DownvoteUri(postId));
}

export function useUnreact(postId: string) {
  return usePostApiWithAuth<EmptyRequest, EmptyResponse>(UnreactUri(postId));
}

export function useCategoryPosts() {
  return useGetApi<GetPostsResponse, PostViewModel>(CategoryPostUri, true, {
    wait: true,
  });
}

export function useUserPosts(userId: string) {
  return useGetApi<GetPostsResponse, PostViewModel>(UserPostsUri, true, {
    wait: false,
    info: {
      limit: 0,
      queryParams: [{ key: "profileId", value: userId }],
      skip: 0,
    },
  });
}

export function usePostSearchByTerm() {
  return useGetApi<GetPostsResponse, PostViewModel>(PostSearchByTermUri);
}

export function usePostById(postId: string) {
  return useGetApi<PostViewModel, PostViewModel>(GetPostUri(postId));
}
