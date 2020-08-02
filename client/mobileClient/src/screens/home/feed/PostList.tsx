import React, { useState, useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import {
  RefreshControl,
  NativeSyntheticEvent,
  NativeScrollEvent,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { PostViewModel } from "../../../api/posts/PostsApiModel";
import { PostListItem } from "./PostListItem";
import { MainColor } from "../../../shared/Const";

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
      contentContainerStyle={{
        padding: 10,
      }}
      ListEmptyComponent={
        <View style={styles.textContainer}>
          <Text style={styles.text}>No Records</Text>
        </View>
      }
      data={posts}
      renderItem={(post) => (
        <PostListItem refresh={onRefresh} key={post.item.id} post={post.item} />
      )}
      extraData={[]}
      // onMomentumScrollEnd={onScrollEnd}
      // refreshControl={
      //   <RefreshControl refreshing={isLoading} onRefresh={onRefreshInternal} />
      // }
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
