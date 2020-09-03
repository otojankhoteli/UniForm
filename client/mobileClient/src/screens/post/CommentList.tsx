import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import Comment from "./Comment";
import { CommentViewModel, GetCommentsResponse } from "../../api/comments/CommentsApiModel";
import { useGetComments } from "../../api/comments/CommentsApiHook";

interface Props {
  readonly comments: GetCommentsResponse;
  readonly header: React.ReactElement;
}

const CommentList: React.FC<Props> = ({ comments, header }) => {

  return (
    <FlatList
      style={{ flex: 1 }}
      ListHeaderComponent={header}
      data={comments}
      keyExtractor={(_, index) => {
        return index.toString();
      }}
      renderItem={(item) => {
        return <Comment comment={item.item} index={item.index} />;
      }}
    ></FlatList>
  );
};

export default CommentList;
