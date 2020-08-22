import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  RefreshControl,
  SafeAreaView,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { CategoryViewModel } from "../../api/categories/CategoriesApiModel";
import CategoryListItem from "./CategoryListItem";

interface Props {
  isLoading: boolean;
  categories: CategoryViewModel[];
  onSelect?: (categoryId: CategoryViewModel) => void;
  onRefresh: () => void;
  fetchNextPage: () => void;
  fetchPrevPage: () => void;
}
export default function CategoryList({
  isLoading,
  categories,
  onSelect,
  onRefresh,
  fetchNextPage,
  fetchPrevPage,
}: Props) {
  const [internalCategories, setInternalCategories] = useState([]);

  useEffect(() => {
    setInternalCategories((category) => category.concat(categories));
  }, [categories]);

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    let { contentOffset } = e.nativeEvent;
    let viewSize = e.nativeEvent.layoutMeasurement;

    let pageNum = Math.round(contentOffset.y / viewSize.height);
    console.log("pageNum", pageNum, contentOffset.y, viewSize.height);
    if (contentOffset.y > 0) {
      fetchNextPage();
    }
  };

  const onRefreshInternal = () => {
    setInternalCategories([]);
    onRefresh();
  };

  return (
    <FlatList
      data={internalCategories}
      renderItem={(category) => (
        <CategoryListItem
          key={category.item.id}
          category={category.item}
          onCategoryClick={onSelect}
        />
      )}
      onMomentumScrollEnd={onScrollEnd}
      showsVerticalScrollIndicator
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={onRefreshInternal} />
      }
    />
  );
}
