import { usePostApiWithAuth, useGetApi } from "../shared/ApiHook";
import {
  DownvoteUri,
  UpvoteUri,
  CreateCommentUri,
  GetCommentsUri,
  GetCommentUri,
  UnReactUri,
} from "./CommentsApiUri";
import { EmptyRequest, EmptyResponse } from "../shared/ApiResponse";
import {
  CreateCommentRequest,
  GetCommentsResponse,
  CommentViewModel,
} from "./CommentsApiModel";

export function useCreateComment() {
  return usePostApiWithAuth<CreateCommentRequest>(CreateCommentUri);
}

export function useGetComments(postId: string) {
  return useGetApi<GetCommentsResponse, CommentViewModel>(
    GetCommentsUri,
    true,
    {
      wait: false,
      info: {
        limit: 10,
        queryParams: [{ key: "_id", value: postId }],
        skip: 0,
      },
    }
  );
}

export function useGetComment(commentId: string) {
  return useGetApi<CommentViewModel, CommentViewModel>(
    GetCommentUri(commentId)
  );
}

export function useUpvote(commentId: string) {
  return usePostApiWithAuth<EmptyRequest, EmptyResponse>(UpvoteUri(commentId));
}

export function useDownvote(commentId: string) {
  return usePostApiWithAuth<EmptyRequest, EmptyResponse>(
    DownvoteUri(commentId)
  );
}

export function useUnReact(commentId: string) {
  return usePostApiWithAuth<EmptyRequest, EmptyResponse>(UnReactUri(commentId));
}
