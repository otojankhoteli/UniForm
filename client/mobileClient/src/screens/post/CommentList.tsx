import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import Comment from "./Comment";
import { CommentViewModel } from "../../api/comments/CommentsApiModel";
import { useGetComments } from "../../api/comments/CommentsApiHook";

interface Props {
  readonly postId: string;
  readonly header: React.ReactElement;
}

const CommentList: React.FC<Props> = (props) => {
  // const { result: comments } = useGetComments(props.postId);
  const [comments, setComments] = useState<CommentViewModel[]>([]);

  useEffect(() => {
    //TODO actually fetch comments
    let tempComments: CommentViewModel[] = [];
    for (let i = 0; i < 10; i++) {
      tempComments.push({
        authorId: "1",
        authorProfilePic:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.askmen.com%2F1080x540%2F2016%2F01%2F25-021526-facebook_profile_picture_affects_chances_of_getting_hired.jpg&f=1&nofb=1",
        authorUsername: "tbubu14",
        createdAt: "2020-07-25T21:27:43.160Z",
        files: [],
        isDownvoted: false,
        isUpvoted: false,
        updatedAt: "",
        id: "1",
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, niam, quis",
        userTags: [],
        voteCount: 12,
      });
    }
    setComments(tempComments);
  }, []);

  return (
    <FlatList
      style={{ flex: 1 }}
      ListHeaderComponent={props.header}
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
