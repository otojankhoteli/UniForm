import React from "react";
import { CommentViewModel } from "../../api/posts/PostsApiModel";
import { FlatList } from "react-native";
import Comment from "./Comment";

interface Props {
  readonly comments: CommentViewModel[];
  readonly header: React.ReactElement;
}

const CommentList: React.FC<Props> = (props) => {
  return (
    <FlatList
      style={{ flex: 1 }}
      ListHeaderComponent={props.header}
      data={props.comments}
      keyExtractor={(_, index) => {
        return index.toString();
      }}
      renderItem={(item) => {
        return <Comment comment={item.item} />;
      }}
    ></FlatList>
  );
};

export default CommentList;
