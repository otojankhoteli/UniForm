import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

interface Props {
  readonly upvote: () => void;
  readonly downvote: () => void;
  readonly isUpvoted: boolean;
  readonly isDownvoted: boolean;
  readonly voteCount: number;
  readonly size: "large" | "small";
}

const VotePanel: React.FC<Props> = (props) => {
  const upVoteIconStyle = props.isUpvoted
    ? styles.votedIconColor
    : styles.notVotedIconColor;
  const downVoteIconStyle = props.isDownvoted
    ? styles.votedIconColor
    : styles.notVotedIconColor;

  return (
    <View style={styles.voteActionContainer}>
      <Icon
        size={props.size == "large" ? 30 : 24}
        onPress={() => {
          props.upvote();
        }}
        style={upVoteIconStyle}
        name="chevron-up"
      />
      <Text>{props.voteCount}</Text>
      <Icon
        size={props.size == "large" ? 30 : 24}
        onPress={() => {
          props.downvote();
        }}
        style={downVoteIconStyle}
        name="chevron-down"
      />
    </View>
  );
};

export default VotePanel;

const styles = StyleSheet.create({
  voteActionContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 15,
    // borderWidth: 1,
    // borderColor: "red",
  },
  votedIconColor: {
    color: "rgb(80,230,255)",
  },
  notVotedIconColor: {
    color: "gray",
  },
});
