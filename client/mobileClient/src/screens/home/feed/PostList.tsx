import React, { useState, useEffect } from 'react'
import { FlatList } from 'react-native-gesture-handler';
import { RefreshControl, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { PostViewModel } from '../../../api/posts/PostsApiModel';
import { PostListItem } from './PostListItem';
import CategoryListItem from '../../postCategories/CategoryListItem';

interface Props {
  posts: PostViewModel[];
  isLoading: boolean;
  onSelect?: (categoryId: PostViewModel) => void;
  onRefresh: () => void;
  fetchNextPage: () => void;
  fetchPrevPage: () => void;
}
export function PostList({ posts, isLoading, fetchNextPage, onRefresh }: Props) {
  const [internalPosts, setInternalPosts] = useState<PostViewModel[]>([]);

  useEffect(() => {
    setInternalPosts(category => {
      const map = new Map<string, PostViewModel>();
      const concated = category.concat(posts);

      concated.forEach(item => {
        map.set(item.id, item);
      })

      return [...map.values()];
    });
  }, [posts])

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    let { contentOffset } = e.nativeEvent;
    let viewSize = e.nativeEvent.layoutMeasurement;

    let pageNum = Math.round(contentOffset.y / viewSize.height);
    console.log("pageNum", pageNum, contentOffset.y, viewSize.height);
    if (contentOffset.y > 0) {
      fetchNextPage();
    }
  }

  const onRefreshInternal = () => {
    setInternalPosts([]);
    onRefresh();
  }
  console.log("result", posts);
  return <FlatList
    style={{ flex: 1 }}
    contentContainerStyle={{ justifyContent: "flex-start", alignItems: "center", display: "flex", flexDirection: "column", flex: 1, borderWidth: 1, borderColor: "red" }}
    data={internalPosts}
    renderItem={post => (<PostListItem refresh={onRefresh} key={post.item.id} post={post.item} />)}
    onMomentumScrollEnd={onScrollEnd}
    showsVerticalScrollIndicator
    refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefreshInternal} />} />
}