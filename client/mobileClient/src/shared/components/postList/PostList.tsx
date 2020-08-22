import React from "react";
import { FlatList } from "react-native";
import { PostViewModel } from "../../../api/posts/PostsApiModel";
import { PostListItem } from "./PostListItem";

interface Props {
  readonly posts: PostViewModel[];
  readonly header: React.ReactElement;
}

const PostList: React.FC<Props> = (props) => {
  return (
    <FlatList
      style={{ flex: 1 }}
      ListHeaderComponent={props.header}
      data={props.posts}
      keyExtractor={(_, index) => {
        return index.toString();
      }}
      renderItem={(item) => {
        return <PostListItem post={item.item} />;
      }}
    ></FlatList>
  );
};

export default PostList;
