import React, { useState, useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import {
  RefreshControl,
  NativeSyntheticEvent,
  NativeScrollEvent,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { PostViewModel } from "../../../api/posts/PostsApiModel";
import { MainColor } from "../../../shared/Const";
import { PostListItem } from "../../../shared/components/postList/PostListItem";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList } from "../../../shared/navigation/HomeStackScreen";

interface Props {
  posts: PostViewModel[];
  isLoading: boolean;
  onSelect?: (categoryId: PostViewModel) => void;
  onRefresh: () => void;
  fetchNextPage: () => void;
  fetchPrevPage: () => void;
}
export function PostList({
  posts,
  isLoading,
  fetchNextPage,
  onRefresh,
}: Props) {
  const navigation = useNavigation<
    StackNavigationProp<HomeStackParamList, "Post">
  >();
  const [internalPosts, setInternalPosts] = useState<PostViewModel[]>([]);

  useEffect(() => {
    setInternalPosts((category) => {
      const map = new Map<string, PostViewModel>();
      const concated = category.concat(posts);

      concated.forEach((item) => {
        map.set(item.id, item);
      });

      return [...map.values()];
    });
  }, [posts]);

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    let { contentOffset } = e.nativeEvent;
    let viewSize = e.nativeEvent.layoutMeasurement;

    let pageNum = Math.round(contentOffset.y / viewSize.height);
    console.log("pageNum", pageNum, contentOffset.y, viewSize.height);
    console.log(contentOffset.y);
    if (contentOffset.y > 0) {
      fetchNextPage();
    }
  };

  const onRefreshInternal = () => {
    setInternalPosts([]);
    onRefresh();
  };

  return (
    <FlatList
      style={{ flex: 1 }}
      contentContainerStyle={{}}
      ListEmptyComponent={
        <View style={styles.textContainer}>
          <Text style={styles.text}>No Records</Text>
        </View>
      }
      data={posts}
      renderItem={(item) => (
        <TouchableOpacity
          onPress={() => {
            navigation.push("Post", { postId: item.item.id });
          }}
          activeOpacity={1}
        >
          <PostListItem refresh={() => {}} post={item.item} />
        </TouchableOpacity>
      )}
      extraData={[]}
      // onMomentumScrollEnd={onScrollEnd}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={onRefreshInternal} />
      }
    />
  );
}

const styles = StyleSheet.create({
  text: {
    color: MainColor,
    fontSize: 21,
    fontWeight: "bold",
    marginRight: 5,
  },
  textContainer: {
    alignItems: "center",
    height: 100,
    justifyContent: "center",
    width: "100%",
  },
});
