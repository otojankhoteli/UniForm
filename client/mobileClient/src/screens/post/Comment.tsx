import React from "react";
import { View, Text, Image } from "react-native";
import { CommentViewModel } from "../../api/posts/PostsApiModel";
import AvatarCustom from "../../shared/components/Avatar";
import VotePanel from "../../shared/components/VotePanel";
import { getTimeFormat } from "../../shared/Utils";

interface Props {
  readonly comment: CommentViewModel;
}

const Comment: React.FC<Props> = (props) => {
  return (
    <View style={{ flexDirection: "row", marginTop: 10, marginLeft: 5 }}>
      <VotePanel
        downvote={() => {}}
        upvote={() => {}}
        isDownvoted={false} //TODO
        isUpvoted={false}
        voteCount={props.comment.voteCount}
        size={"small"}
      />
      <View>
        <View style={{ flexDirection: "row", paddingVertical: 10 }}>
          <Image
            source={{ uri: props.comment.author.photoURL }}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 16, marginLeft: 5 }}>
              {`${props.comment.author.role == "student" ? "s" : "a"}/${
                props.comment.author.name
              } ${props.comment.author.surname}`}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "rgb(100,100,100)",
                marginLeft: 5,
              }}
            >{`${getTimeFormat(
              new Date(),
              new Date("2020-07-25T21:27:43.160Z")
            )}`}</Text>
          </View>
        </View>
        <Text
          style={{
            fontSize: 16,
            marginRight: 60,
          }}
        >
          {props.comment.text}
        </Text>
      </View>
    </View>
  );
};

export default Comment;
