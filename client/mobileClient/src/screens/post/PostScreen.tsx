import { useRoute, RouteProp } from "@react-navigation/native";
import { HomeStackParamList } from "../../shared/navigation/HomeStackScreen";
import React, { useEffect, useRef, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { PostListItem } from "../../shared/components/postList/PostListItem";
import CommentList from "./CommentList";
import CommentInput from "./CommentInput";
import { CommentViewModel } from "../../api/comments/CommentsApiModel";
import { useGetComments } from "../../api/comments/CommentsApiHook";
import { usePostById } from "../../api/posts/PostsApiHook";
import { PostViewModel } from "../../api/posts/PostsApiModel";

const PostScreen: React.FC = () => {
  const route = useRoute<RouteProp<HomeStackParamList, "Post">>();
  const postId = useRef(route.params.postId).current;

  const { result: post } = usePostById(route.params.postId);

  if (!post)
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator
          style={{ marginTop: 20 }}
          color={"rgb(100,255,150)"}
          size={"large"}
        ></ActivityIndicator>
      </View>
    );

  return (
    <View style={{ flex: 1 }}>
      <CommentList
        postId={postId}
        header={
          <View>
            <PostListItem post={post || EmptyPost} refresh={() => {}} />
            <CommentInput postId={postId} />
          </View>
        }
      />
    </View>
  );
};

export default PostScreen;

const EmptyPost: PostViewModel = {
  id: "",
  text: "",
  authorId: "5f1c90ca2fe410a227a969f7",
  authorUsername: "",
  authorProfilePic: "",
  voteCount: 0,
  categoryName: "",
  categoryId: "5f1ca0e1038af74494cbeda4",
  isJoined: false,
  isUpvoted: false,
  isDownvoted: false,
  createdAt: "2020-07-25T21:27:43.160Z",
  files: [],
  commentCount: 0,
};
