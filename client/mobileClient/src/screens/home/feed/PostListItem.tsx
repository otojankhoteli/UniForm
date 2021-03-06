import React, { useMemo, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import OctIcon from "react-native-vector-icons/Octicons";
import FeatherIcon from "react-native-vector-icons/Feather";
import { PostViewModel } from "../../../api/posts/PostsApiModel";
import AvatarCustom from "../../../shared/components/Avatar";
import { MainColor } from "../../../shared/Const";
import HorizontalLine from "../../../shared/components/HorizontalLine";
import { getTimeFormat } from "../../../shared/Utils";
import { extractNodesFromInputText } from "../../addPost/AddPostUtils";
import { TextWithTags } from "../../addPost/TextWithTags";
import { useUpvote, useDownvote } from "../../../api/posts/PostsApiHook";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList } from "../../../shared/navigation/HomeStackScreen";

interface Props {
  post: PostViewModel;
  refresh: () => void;
}
export function PostListItem({ post, refresh }: Props) {
  const navigation = useNavigation<
    StackNavigationProp<HomeStackParamList, "Feed">
  >();

  const textNodes = useMemo(() => extractNodesFromInputText(post.text), [
    post.text,
  ]);

  const {
    post: upvote,
    result: upvoteResult,
    isError: upvoteFailed,
  } = useUpvote(post.id);

  const {
    post: downvote,
    result: downvoteResult,
    isError: downvoteFailed,
  } = useDownvote(post.id);

  const upVoteIconStyle = post.isUpvoted
    ? styles.votedIconColor
    : styles.notVotedIconColor;
  const downVoteIconStyle = post.isDownvoted
    ? styles.votedIconColor
    : styles.notVotedIconColor;

  useEffect(() => {
    if (
      (upvoteResult && !upvoteFailed) ||
      (downvoteResult && !downvoteFailed)
    ) {
      refresh();
    }
  }, [upvoteResult, upvoteFailed, downvoteResult, downvoteFailed]);

  const navigateToCategoryScreen = () => {
    //
  };

  const joinCategory = () => {
    //
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={() => {
        navigation.navigate("Post", { postId: post.id });
      }}
    >
      <View style={styles.voteActionContainer}>
        <Icon
          size={30}
          onPress={() => {
            upvote({});
          }}
          style={upVoteIconStyle}
          name="chevron-up"
        />
        <Text>{post.voteCount}</Text>
        <Icon
          size={30}
          onPress={() => {
            downvote({});
          }}
          style={downVoteIconStyle}
          name="chevron-down"
        />
      </View>
      <View style={styles.content}>
        <View style={styles.topSection}>
          <AvatarCustom photoUrl={post.authorProfilePic} />
          <View style={styles.topMiddleSection}>
            <View style={styles.categorySection}>
              <Text style={styles.clickableCategoryName}>u/</Text>
              <TouchableOpacity onPress={navigateToCategoryScreen}>
                <Text style={styles.clickableCategoryName}>
                  {post.categoryName}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.authorSection}>
              <Text style={styles.timePassedText}>Posted by </Text>
              <Text style={styles.clickableAuthorName}>s/</Text>
              <TouchableOpacity onPress={navigateToCategoryScreen}>
                <Text style={styles.clickableAuthorName}>
                  {post.authorUsername}
                </Text>
              </TouchableOpacity>
              <Text style={styles.timePassedText}>
                {" "}
                {getTimeFormat(new Date(), new Date(post.createdAt))}
              </Text>
            </View>
          </View>
          <Icon
            color={post.isJoined ? "#AA061A" : "gray"}
            size={20}
            solid={post.isJoined}
            style={styles.joinCategoryIcon}
            onPress={joinCategory}
            name="heart"
          />
        </View>
        {/* <Text style={styles.postText}>{post.text}</Text> */}
        <View style={styles.postText}>
          <TextWithTags viewMode="Rest" nodes={[...textNodes]} />
        </View>
        <View
          style={{
            height: 0.5,
            backgroundColor: "rgba(0,0,0,0.5)",
            marginRight: 10,
          }}
        />
        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() => {
              alert("comments");
            }}
          >
            <OctIcon
              name={"comment-discussion"}
              size={27}
              color={"black"}
            ></OctIcon>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() => {
              alert("comments");
            }}
          >
            <FeatherIcon
              name={"bookmark"}
              size={27}
              color={"black"}
            ></FeatherIcon>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  authorSection: {
    alignItems: "center",
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    marginRight: "auto",
  },
  bottomSection: {
    flexDirection: "row",
    padding: 5,
    marginVertical: 10,
  },
  categorySection: {
    alignItems: "center",
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    marginRight: "auto",
  },
  clickableAuthorName: {
    color: MainColor,
    fontSize: 13,
    fontWeight: "bold",
  },
  clickableCategoryName: {
    color: MainColor,
    fontSize: 15,
    fontWeight: "bold",
  },
  container: {
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 3,
    margin: 5,
    paddingTop: 10,
    paddingHorizontal: 5,
    flexDirection: "row",
    // width: "100%",
  },
  joinCategoryIcon: {
    marginLeft: "auto",
    marginRight: 10,
    marginTop: 5,
  },
  notVotedIconColor: {
    color: "gray",
  },
  postText: {
    paddingBottom: 10,
    paddingHorizontal: 5,
  },
  timePassedText: {
    fontSize: 10,
  },
  topMiddleSection: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 10,
  },
  topSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  voteActionContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 15,
    // borderWidth: 1,
    // borderColor: "red",
  },
  votedIconColor: {
    color: "#386083",
  },
  content: {
    flex: 1,
  },
});
