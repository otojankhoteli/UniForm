import React, { useMemo, useEffect, useState } from "react";
import { View, Image, Text } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { HomeStackParamList } from "../../shared/navigation/HomeStackScreen";
import { StackNavigationProp } from "@react-navigation/stack";
import { PostViewModel } from "../../api/posts/PostsApiModel";
import PostList from "../../shared/components/postList/PostList";
import { CategoryViewModel } from "../../api/categories/CategoriesApiModel";
import { useCategoryPosts } from "../../api/posts/PostsApiHook";
import { useCategoryById } from "../../api/categories/CategoriesApiHook";
import { CategoryByIdUri } from "../../api/categories/CategoriesApiUri";

const CategoryScreen: React.FC = () => {
  const route = useRoute<RouteProp<HomeStackParamList, "Category">>();
  const navigation = useNavigation<
    StackNavigationProp<HomeStackParamList, "Category">
  >();

  const [categoryId, setCategoryId] = useState<string>("");
  const { result: category, setUri } = useCategoryById(categoryId);
  const { result: posts, setRequestInfo: fetch } = useCategoryPosts();

  console.log("category", category)

  useEffect(() => {
    navigation.setOptions({ headerTitle: "u/" + route.params.categoryName });
    console.log("params", route.params);
    setCategoryId(route.params.categoryId);
    fetch(prev => ({
      wait: false,
      info: {
        queryParams: [{ key: "categoryId", value: route.params.categoryId }],
        limit: prev.info?.limit,
        skip: prev.info?.skip
      }
    }))
  }, [route.params]);


  useEffect(() => {
    if (categoryId == null || categoryId == undefined)
      return;
    console.log("refetch category by id", categoryId)
    setUri(CategoryByIdUri(categoryId))
  }, [categoryId]);

  return (
    <View style={{ flex: 1 }}>
      <PostList
        posts={posts}
        header={
          <View
            style={{
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: 100, height: 100, borderRadius: 50 }}
              source={{ uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.w3schools.com%2Fw3css%2Fimg_snowtops.jpg&f=1&nofb=1" }}
            ></Image>
            <Text style={{ fontSize: 16, marginTop: 10 }}>
              {category?.description}
            </Text>
            <Text style={{ fontSize: 14, color: "rgb(120,120,120)" }}>
              Created by:{" "}
              <Text
                style={{ fontSize: 16, fontWeight: "bold", color: "black" }}
              >{`s/${category?.author?.name}`}</Text>
            </Text>
            <Text style={{ fontSize: 14 }}>
              Members: {category?.memberCount}
            </Text>
            <Text style={{ fontSize: 14 }}>Posts: {category?.postCount}</Text>
            {category?.isVerified && (
              <Text style={{ fontSize: 14, color: "rgb(100,100,100)" }}>
                Verified
              </Text>
            )}
          </View>
        }
      ></PostList>
    </View>
  );
};

export default CategoryScreen;
