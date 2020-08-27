import React, { useMemo, useState, useEffect, useLayoutEffect } from "react";
import PostList from "../../../shared/components/postList/PostList";
import { PostViewModel } from "../../../api/posts/PostsApiModel";
import { ActivityIndicator } from "react-native";

interface Props {
  readonly searchTerm: string;
  readonly visible: boolean;
}

const PostSearchList: React.FC<Props> = (props) => {
  const tempPosts = useMemo(() => {
    let data: PostViewModel[] = [];
    for (let i = 0; i < 10; i++) {
      data.push({
        id: "" + i,
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
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
      });
    }
    return data;
  }, []);

  if (!props.visible)
    return <ActivityIndicator style={{ marginTop: 20 }} size="large" />;

  return <PostList header={undefined} posts={tempPosts} />;
};

export default PostSearchList;
