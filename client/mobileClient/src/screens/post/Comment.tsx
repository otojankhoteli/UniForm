import React, { useEffect, useState, useCallback } from "react";
import { View, Text, Image } from "react-native";
import AvatarCustom from "../../shared/components/Avatar";
import VotePanel from "../../shared/components/VotePanel";
import { getTimeFormat } from "../../shared/Utils";
import { CommentViewModel } from "../../api/comments/CommentsApiModel";
import {
  useUpvote,
  useDownvote,
  useUnReact,
} from "../../api/comments/CommentsApiHook";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList } from "../../shared/navigation/HomeStackScreen";

interface Props {
  readonly comment: CommentViewModel;
  readonly index: number;
}

const Comment: React.FC<Props> = (props) => {
  const navigation = useNavigation<
    StackNavigationProp<HomeStackParamList, "Post">
  >();

  const { post: upvote } = useUpvote(props.comment.id);
  const { post: downvote } = useDownvote(props.comment.id);
  const { post: unreact } = useUnReact(props.comment.id);

  const [isUpvoted, setIsUpvoted] = useState(props.comment.isUpvoted);
  const [isDownvoted, setIsDownvoted] = useState(props.comment.isDownvoted);
  const [voteCount, setVoteCount] = useState(props.comment.voteCount);

  const onUpvotePress = useCallback(() => {
    if (isUpvoted) {
      unreact({});
      setVoteCount((prev) => prev - 1);
      setIsUpvoted(false);
    } else {
      upvote({});
      setIsUpvoted(true);
      if (isDownvoted) {
        setIsDownvoted(false);
        setVoteCount((prev) => prev + 2);
      } else setVoteCount((prev) => prev + 1);
    }
  }, [isUpvoted, isDownvoted]);

  const onDownvotePress = useCallback(() => {
    if (isDownvoted) {
      unreact({});
      setVoteCount((prev) => prev + 1);
      setIsDownvoted(false);
    } else {
      downvote({});
      setIsDownvoted(true);
      if (isUpvoted) {
        setIsUpvoted(false);
        setVoteCount((prev) => prev - 2);
      } else setVoteCount((prev) => prev - 1);
    }
  }, [isUpvoted, isDownvoted]);

  return (
    <View
      style={{
        flexDirection: "row",
        paddingTop: 10,
        paddingBottom: 15,
        paddingLeft: 5,
        backgroundColor:
          props.index % 2 == 0 ? "rgb(235,235,235)" : "rgb(250,250,250)",
      }}
    >
      <VotePanel
        downvote={onDownvotePress}
        upvote={onUpvotePress}
        isDownvoted={isDownvoted}
        isUpvoted={isUpvoted}
        voteCount={voteCount}
        size={"small"}
      />
      <View>
        <TouchableHighlight
          onPress={() => {
            navigation.push("Profile", { userId: props.comment.authorId });
          }}
          underlayColor={"rgba(0,0,0,0.01)"}
          activeOpacity={0.99}
        >
          <View style={{ flexDirection: "row", paddingVertical: 10 }}>
            <Image
              source={{ uri: props.comment.authorProfilePic }}
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 16, marginLeft: 5 }}>
                {`${"student" == "student" ? "s" : "a"}/${
                  //TODO
                  props.comment.authorUsername
                }`}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "rgb(100,100,100)",
                  marginLeft: 5,
                }}
              >{`${getTimeFormat(
                new Date(),
                new Date(props.comment.createdAt)
              )}`}</Text>
            </View>
          </View>
        </TouchableHighlight>
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
