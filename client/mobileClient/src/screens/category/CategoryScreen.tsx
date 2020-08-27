import React, { useMemo, useEffect, useState } from "react";
import { View, Image, Text } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { HomeStackParamList } from "../../shared/navigation/HomeStackScreen";
import { StackNavigationProp } from "@react-navigation/stack";
import { PostViewModel } from "../../api/posts/PostsApiModel";
import PostList from "../../shared/components/postList/PostList";
import { CategoryViewModel } from "../../api/categories/CategoriesApiModel";

const CategoryScreen: React.FC = () => {
  const route = useRoute<RouteProp<HomeStackParamList, "Category">>();
  const navigation = useNavigation<
    StackNavigationProp<HomeStackParamList, "Category">
  >();

  const [category, setCategory] = useState<CategoryViewModel>({
    author: {
      email: "tt",
      id: "1",
      name: "Tornike",
      photoURL:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.askmen.com%2F1080x540%2F2016%2F01%2F25-021526-facebook_profile_picture_affects_chances_of_getting_hired.jpg&f=1&nofb=1",
      role: "student",
      surname: "Bubuteishvili",
    },
    description: "Category description",
    id: "1",
    isVerified: true,
    memberCount: 10,
    name: route.params.categoryName,
    photoUri:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.w3schools.com%2Fw3css%2Fimg_snowtops.jpg&f=1&nofb=1",
    postCount: 100,
  });
  const [posts, setPosts] = useState<PostViewModel[]>([]);

  useEffect(() => {
    navigation.setOptions({ headerTitle: "u/" + route.params.categoryName });
  }, [route.params]);

  useEffect(() => {
    //TODO actually fetch posts
    let tempPosts: PostViewModel[] = [];
    for (let i = 0; i < 10; i++) {
      tempPosts.push({
        id: "1",
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        authorId: "5f1c90ca2fe410a227a969f7",
        authorUsername: "ako",
        authorProfilePic: "",
        voteCount: 0,
        categoryName: "MACS",
        categoryId: "5f1ca0e1038af74494cbeda4",
        isJoined: false,
        isUpvoted: false,
        isDownvoted: false,
        createdAt: "2020-07-25T21:27:43.160Z",
        files: ["string"],
      });
    }
    setPosts(tempPosts);
  }, []);

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
              source={{ uri: category.photoUri }}
            ></Image>
            <Text style={{ fontSize: 16, marginTop: 10 }}>
              {category.description}
            </Text>
            <Text style={{ fontSize: 14, color: "rgb(120,120,120)" }}>
              Created by:{" "}
              <Text
                style={{ fontSize: 16, fontWeight: "bold", color: "black" }}
              >{`s/${category.author.name} ${category.author.surname}`}</Text>
            </Text>
            <Text style={{ fontSize: 14 }}>
              Members: {category.memberCount}
            </Text>
            <Text style={{ fontSize: 14 }}>Posts: {category.postCount}</Text>
            {category.isVerified && (
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
