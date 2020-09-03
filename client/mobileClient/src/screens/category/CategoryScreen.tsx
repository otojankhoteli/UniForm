import React, { useMemo, useEffect, useState, useCallback } from "react";
import {
  View,
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { HomeStackParamList } from "../../shared/navigation/HomeStackScreen";
import { StackNavigationProp } from "@react-navigation/stack";
import { PostViewModel } from "../../api/posts/PostsApiModel";
import PostList from "../../shared/components/postList/PostList";
import { CategoryViewModel } from "../../api/categories/CategoriesApiModel";
import { useCategoryPosts } from "../../api/posts/PostsApiHook";
import {
  useCategoryById,
  useSubscribeCategory,
  useUnsubscribeCategory,
} from "../../api/categories/CategoriesApiHook";
import { CategoryByIdUri } from "../../api/categories/CategoriesApiUri";

const CategoryScreen: React.FC = () => {
  const route = useRoute<RouteProp<HomeStackParamList, "Category">>();
  const navigation = useNavigation<
    StackNavigationProp<HomeStackParamList, "Category">
  >();

  const [categoryId, setCategoryId] = useState<string>("");
  const { result: category, setUri } = useCategoryById(categoryId);
  const { result: posts, setRequestInfo: fetch } = useCategoryPosts();
  const { post: subscribe } = useSubscribeCategory(route.params.categoryId);
  const { post: unsubscribe } = useUnsubscribeCategory(route.params.categoryId);

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [memberCount, setMemberCount] = useState(0);

  console.log("category by id ", category)

  useEffect(() => {
    if (category) {
      setMemberCount(prev => prev + (category?.memberCount || 0));
      setIsSubscribed(category.isSubscribed)
    }

  }, [category])

  const onSubscribePress = useCallback(() => {
    if (isSubscribed) {
      unsubscribe({});
      setIsSubscribed(false);
      setMemberCount((prev) => prev - 1);
    } else {
      subscribe({});
      setIsSubscribed(true);
      setMemberCount((prev) => prev + 1);
    }
  }, [isSubscribed]);

  useEffect(() => {
    navigation.setOptions({ headerTitle: "u/" + route.params.categoryName });
    setCategoryId(route.params.categoryId);
    fetch((prev) => ({
      wait: false,
      info: {
        queryParams: [{ key: "categoryId", value: route.params.categoryId }],
        limit: prev.info?.limit,
        skip: prev.info?.skip,
      },
    }));
  }, [route.params]);

  useEffect(() => {
    if (categoryId == null || categoryId == undefined) return;
    setUri(CategoryByIdUri(categoryId));
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
              source={{
                uri:
                  category?.imgUrl ||
                  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.w3schools.com%2Fw3css%2Fimg_snowtops.jpg&f=1&nofb=1",
              }}
            ></Image>
            <Text style={{ fontSize: 16, marginTop: 10 }}>
              {category?.description}
            </Text>
            <Text style={{ fontSize: 14, color: "rgb(120,120,120)" }}>
              Created by:{" "}
              <Text
                style={{ fontSize: 16, fontWeight: "bold", color: "black" }}
                onPress={() => {
                  navigation.push("Profile", { userId: category?.author._id });
                }}
              >{`s/${category?.author?.name || ""}`}</Text>
            </Text>
            <Text style={{ fontSize: 14 }}>Members: {memberCount}</Text>
            <Text style={{ fontSize: 14 }}>Posts: {category?.postCount}</Text>
            {category?.isVerified && (
              <Text style={{ fontSize: 14, color: "rgb(100,100,100)" }}>
                Verified
              </Text>
            )}
            <TouchableOpacity
              style={{
                padding: 5,
                borderRadius: 5,
                margin: 5,
                backgroundColor: isSubscribed
                  ? "rgb(150,150,150)"
                  : "rgb(250,100,120)",
                elevation: 3,
              }}
              onPress={onSubscribePress}
              activeOpacity={0.7}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 16, color: "white" }}
              >
                {isSubscribed ? "Unsubscribe" : "Subscribe"}
              </Text>
            </TouchableOpacity>
          </View>
        }
      ></PostList>
    </View>
  );
};

export default CategoryScreen;
