import { useRoute, RouteProp } from "@react-navigation/native";
import { HomeStackParamList } from "../../shared/navigation/HomeStackScreen";
import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { PostListItem } from "../../shared/components/postList/PostListItem";
import CommentList from "./CommentList";
import CommentInput from "./CommentInput";
import { CommentViewModel } from "../../api/comments/CommentsApiModel";
import { useGetComments } from "../../api/comments/CommentsApiHook";

const PostScreen: React.FC = () => {
  const route = useRoute<RouteProp<HomeStackParamList, "Post">>();
  const post = useRef(route.params.post).current;

  return (
    <View style={{ flex: 1 }}>
      <CommentList
        postId={post.id}
        header={
          <View>
            <PostListItem
              post={{
                id: "1",
                text:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
                authorId: "5f1c90ca2fe410a227a969f7",
                authorUsername: "ako",
                authorProfilePic: "",
                voteCount: 0,
                categoryName: "MACS",
                categoryId: "5f1ca0e1038af74494cbeda4",
                isJoined: false,
                isUpvoted: false,
                isDownvoted: false,
                createdAt: "2020-07-25T21:27:43.160Z",
                files: ["string"],
              }}
            />
            <CommentInput postId={post.id} />
          </View>
        }
      />
    </View>
  );
};

export default PostScreen;
