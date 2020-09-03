import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { PostViewModel } from "../../../api/posts/PostsApiModel";
import { PostListItem } from "./PostListItem";
import { useNavigation } from "@react-navigation/native";
import { HomeStackParamList } from "../../navigation/HomeStackScreen";
import { StackNavigationProp } from "@react-navigation/stack";

interface Props {
  readonly posts: PostViewModel[];
  readonly header: React.ReactElement;
  refresh?: () => void;
}

const PostList: React.FC<Props> = (props) => {
  const navigation = useNavigation<
    StackNavigationProp<HomeStackParamList, "Post">
  >();
  console.log(props.posts);
  return (
    <FlatList
      style={{ flex: 1 }}
      ListHeaderComponent={props.header}
      data={props.posts}
      keyExtractor={(_, index) => {
        return index.toString();
      }}
      renderItem={(item) => {
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.push("Post", { postId: item.item.id });
            }}
            activeOpacity={1}
          >
            <PostListItem refresh={props.refresh} post={item.item} />
          </TouchableOpacity>
        );
      }}
    ></FlatList>
  );
};

export default PostList;
