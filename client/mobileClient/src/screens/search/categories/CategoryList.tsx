import React, { useMemo, useEffect, useState } from "react";
import { CategoryViewModel } from "../../../api/categories/CategoriesApiModel";
import { FlatList, View, ActivityIndicator } from "react-native";
import CategoryListItem from "./CategoryListItem";
import FloatingButton from "../../../shared/components/FloatingButton";
import { useNavigation } from "@react-navigation/native";
import {
  useCategoriesByName,
  useSubscribeCategory,
  useUnsubscribeCategory,
} from "../../../api/categories/CategoriesApiHook";

interface Props {
  readonly searchTerm: string;
  readonly visible: boolean;
}

const CategoryList: React.FC<Props> = (props) => {
  const navigation = useNavigation();
  const [targetCategory, setTargetCategory] = useState<CategoryViewModel>(
    {} as any
  );
  const {
    post: subscribe,
    isError: failedSubscribe,
    result: subscribeResult,
  } = useSubscribeCategory(targetCategory && targetCategory.id);
  const {
    post: unsubscribe,
    isError: failedUnsubscribe,
    result: unsubscribeResult,
  } = useUnsubscribeCategory(targetCategory && targetCategory.id);

  const {
    result: categories,
    setRequestInfo,
    fetchNextPage,
    fetchPrevPage,
    refetch,
    error,
    isError,
    isLoading,
  } = useCategoriesByName();
  console.log(categories);
  useEffect(() => {
    if (props.visible) {
      setRequestInfo({
        wait: false,
        info: {
          limit: 10,
          queryParams: [{ key: "name", value: props.searchTerm }],
          skip: 0,
        },
      });
    }
  }, [props.searchTerm, props.visible]);

  useEffect(() => {
    if (targetCategory.id == null || targetCategory.id == undefined) {
      return;
    }
    if (targetCategory.isSubscribed) {
      unsubscribe({});
    } else {
      subscribe({});
    }
  }, [targetCategory]);

  useEffect(() => {
    if (
      (!failedSubscribe && subscribeResult) ||
      (!failedUnsubscribe && unsubscribeResult)
    ) {
      refetch();
    }
  }, [failedSubscribe, subscribeResult, failedUnsubscribe, unsubscribeResult]);

  if (!props.visible || isLoading)
    return <ActivityIndicator style={{ marginTop: 20 }} size="large" />;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={categories}
        keyExtractor={(_, index) => {
          return index.toString();
        }}
        renderItem={(item) => {
          return (
            <CategoryListItem
              onSubscribe={(category) => setTargetCategory(category)}
              categoryData={item.item}
            ></CategoryListItem>
          );
        }}
        ListFooterComponent={<View style={{ height: 70 }}></View>}
      ></FlatList>
      <FloatingButton
        onPress={() => {
          navigation.navigate("AddCategory");
        }}
        color={"rgba(32,255,64,1)"}
        type={"add"}
      />
    </View>
  );
};

export default CategoryList;
