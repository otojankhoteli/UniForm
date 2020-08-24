import { useRoute, RouteProp } from "@react-navigation/native";
import { HomeStackParamList } from "../../shared/navigation/HomeStackScreen";
import React, { useMemo, useEffect, useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import OctIcon from "react-native-vector-icons/Octicons";
import FeatherIcon from "react-native-vector-icons/Feather";
import AvatarCustom from "../../shared/components/Avatar";
import { getTimeFormat } from "../../shared/Utils";
import { TextWithTags } from "../addPost/TextWithTags";
import { MainColor } from "../../shared/Const";
import { extractNodesFromInputText } from "../addPost/AddPostUtils";
import { useUpvote, useDownvote } from "../../api/posts/PostsApiHook";
import { PostListItem } from "../../shared/components/postList/PostListItem";
import CommentList from "./CommentList";
import { CommentViewModel } from "../../api/posts/PostsApiModel";

const PostScreen: React.FC = () => {
  const route = useRoute<RouteProp<HomeStackParamList, "Post">>();
  const post = useRef(route.params.post).current;

  const [comments, setComments] = useState<CommentViewModel[]>([]);

  useEffect(() => {
    //TODO actually fetch comments
    let tempComments: CommentViewModel[] = [];
    for (let i = 0; i < 10; i++) {
      tempComments.push({
        author: {
          id: "1",
          email: "g",
          role: "student",
          name: "Tornike",
          surname: "Bubuteishvili",
          photoURL:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.askmen.com%2F1080x540%2F2016%2F01%2F25-021526-facebook_profile_picture_affects_chances_of_getting_hired.jpg&f=1&nofb=1",
        },
        downVoters: [],
        id: "1",
        post: "2",
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis",
        upVoters: [],
        userTags: [],
        voteCount: 12,
      });
    }
    setComments(tempComments);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <CommentList comments={comments} header={<PostListItem post={post} />} />
    </View>
  );
};

export default PostScreen;
