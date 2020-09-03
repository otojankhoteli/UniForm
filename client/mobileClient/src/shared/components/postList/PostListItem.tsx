import React, { useMemo, useEffect, useCallback, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import OctIcon from "react-native-vector-icons/Octicons";
import FeatherIcon from "react-native-vector-icons/Feather";
import { PostViewModel } from "../../../api/posts/PostsApiModel";
import AvatarCustom from "../../../shared/components/Avatar";
import { MainColor } from "../../../shared/Const";
import HorizontalLine from "../../../shared/components/HorizontalLine";
import { getTimeFormat } from "../../../shared/Utils";
import {
  useUpvote,
  useDownvote,
  useUnreact,
} from "../../../api/posts/PostsApiHook";
import { useNavigation } from "@react-navigation/native";
import { extractNodesFromInputText } from "../../../screens/addPost/AddPostUtils";
import { TextWithTags } from "../../../screens/addPost/TextWithTags";
import VotePanel from "../VotePanel";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList } from "../../navigation/HomeStackScreen";
import { GetFileUri } from "../../../api/blobs/BlobApiUri";
import PostFiles from "./PostFiles";

interface Props {
  post: PostViewModel;
  refresh: () => void;
}

export function PostListItem({ post, refresh }: Props) {
  const navigation = useNavigation<
    StackNavigationProp<HomeStackParamList, "Post">
  >();

  const textNodes = useMemo(() => extractNodesFromInputText(post.text), [
    post.text,
  ]);

  const { post: upvote } = useUpvote(post.id);
  const { post: downvote } = useDownvote(post.id);
  const { post: unreact } = useUnreact(post.id);

  const [isUpvoted, setIsUpvoted] = useState(post.isUpvoted);
  const [isDownvoted, setIsDownvoted] = useState(post.isDownvoted);
  const [voteCount, setVoteCount] = useState(post.voteCount);

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

  const navigateToCategoryScreen = () => {
    navigation.push("Category", {
      categoryId: post.categoryId,
      categoryName: post.categoryName,
    });
  };

  const navigateToProfile = () => {
    navigation.push("Profile", { userId: post.authorId });
  };

  const joinCategory = () => {
    //
  };

  return (
    <View style={styles.container}>
      <VotePanel
        downvote={onDownvotePress}
        upvote={onUpvotePress}
        isDownvoted={isDownvoted}
        isUpvoted={isUpvoted}
        voteCount={voteCount}
        size={"large"}
      />
      <View style={styles.content}>
        <View style={styles.topSection}>
          <Image
            source={{ uri: post.authorProfilePic || "uri" }}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
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
              <TouchableOpacity onPress={navigateToProfile}>
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
        </View>
        {/* <Text style={styles.postText}>{post.text}</Text> */}
        <View style={styles.postText}>
          <TextWithTags viewMode="Rest" nodes={[...textNodes]} />
        </View>
        {post.files.length !== 0 && <PostFiles files={post.files} />}
        <View
          style={{
            height: 0.5,
            backgroundColor: "rgba(0,0,0,0.5)",
            marginRight: 10,
          }}
        />
        <View style={styles.bottomSection}>
          <OctIcon
            name={"comment-discussion"}
            size={27}
            color={"black"}
          ></OctIcon>
          <Text
            style={{
              fontSize: 14,
              color: "rgb(100,100,100)",
              marginLeft: 5,
              marginTop: 3,
            }}
          >
            {post.commentCount || 0}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  authorSection: {
    alignItems: "center",
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
    flexDirection: "row",
    marginBottom: 10,
  },
  content: {
    flex: 1,
  },
});
