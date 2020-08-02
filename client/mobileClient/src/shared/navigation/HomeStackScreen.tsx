import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AddPostScreen from "../../screens/addPost/AddPostScreen";
import ChooseCategoryScreen from "../../screens/postCategories/ChooseCategoryScreen";
import HomeScreen from "../../screens/home/HomeScreen";
import { CategoryViewModel } from "../../api/categories/CategoriesApiModel";
import PostScreen from "../../screens/post/PostScreen";
import { PostViewModel } from "../../api/posts/PostsApiModel";

export type HomeStackParamList = {
  Home: undefined;
  AddPost: { category: CategoryViewModel };
  ChooseCategory: undefined;
  Feed: { sort: "latest" | "top" } | undefined;
  Post: { post: PostViewModel };
};
const HomeStack = createStackNavigator();

const HomeStackScreen: React.FC = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name={"Home"}
        component={HomeScreen}
        options={{ headerShown: false }}
      ></HomeStack.Screen>
      <HomeStack.Screen
        name="AddPost"
        component={AddPostScreen}
        options={{ headerTitle: "Add Post" }}
      />
      <HomeStack.Screen
        name="ChooseCategory"
        component={ChooseCategoryScreen}
        options={{ headerTitle: "Choose Category" }}
      />
      <HomeStack.Screen
        name="Post"
        component={PostScreen}
        options={{ headerTitle: "Post" }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
