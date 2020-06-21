import { usePostApiWithAuth, useGetApi, GetApiHookResult } from "../shared/ApiHook";
import { CreatePostRequest, GetPostsResponse, PostViewModel } from "./PostsApiModel";
import { CreatePostUri, GetFeedUri } from "./PostsApiUri";

export function usePostCreate() {
  return usePostApiWithAuth<CreatePostRequest>(CreatePostUri);
}

export function useFeed() {
  return useGetApi<GetPostsResponse, PostViewModel>(GetFeedUri);
}

export function useMockFeed(): GetApiHookResult<GetPostsResponse, PostViewModel> {
  const useGetApiResult= useGetApi<GetPostsResponse, PostViewModel>(GetFeedUri);

  return {
    ...useGetApiResult,
    result: [{ authorProfilePic: "", authorUsername: "Ako", authorId: "1", categoryName: "MACS", categoryId: "1", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley", voteCount: 10, files: [], id: "1123", isUpvoted: true, isDownvoted: false,isJoined:true },
    { authorProfilePic: "", authorUsername: "Bubuta", authorId: "2", categoryName: "MACS", categoryId: "1", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley", voteCount: 10, files: [], id: "2123", isUpvoted: false, isDownvoted: true,isJoined:true },
    { authorProfilePic: "", authorUsername: "Janxo", authorId: "3", categoryName: "MACS", categoryId: "1", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley", voteCount: 10, files: [], id: "3123", isUpvoted: true, isDownvoted: false,isJoined:false },
    { authorProfilePic: "", authorUsername: "Ako", authorId: "4", categoryName: "MACS", categoryId: "1", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley", voteCount: 10, files: [], id: "4123", isUpvoted: false, isDownvoted: true,isJoined:true },
    { authorProfilePic: "", authorUsername: "Ako", authorId: "5", categoryName: "MACS", categoryId: "1", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley", voteCount: 10, files: [], id: "5123", isUpvoted: false, isDownvoted: true,isJoined:false },
    { authorProfilePic: "", authorUsername: "Ako", authorId: "6", categoryName: "MACS", categoryId: "1", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley", voteCount: 10, files: [], id: "6123", isUpvoted: false, isDownvoted: true,isJoined:false },
    { authorProfilePic: "", authorUsername: "Ako", authorId: "7", categoryName: "MACS", categoryId: "1", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley", voteCount: 10, files: [], id: "7123", isUpvoted: false, isDownvoted: true,isJoined:false }]
  }
}