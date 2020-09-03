import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "../../screens/search/SearchScreen";
import AddCategoryScreen from "../../screens/addCategory/AddCategoryScreen";
import { PostViewModel } from "../../api/posts/PostsApiModel";
import ProfileScreen from "../../screens/profile/ProfileScreen";
import PostScreen from "../../screens/post/PostScreen";
import CategoryScreen from "../../screens/category/CategoryScreen";

export type SearchStackParamList = {
  Search: undefined;
  AddCategory: undefined;
  Post: { postId: string };
  Profile: { userId: string };
  Category: { categoryId: string; categoryName: string };
};

const SearchStack = createStackNavigator<SearchStackParamList>();

const SearchStackScreen: React.FC = () => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name={"Search"}
        component={SearchScreen}
        options={{ headerShown: false }}
      ></SearchStack.Screen>
      <SearchStack.Screen
        name={"AddCategory"}
        component={AddCategoryScreen}
        options={{ headerTitle: "Create Category" }}
      ></SearchStack.Screen>
      <SearchStack.Screen
        name={"Profile"}
        component={ProfileScreen}
        options={{ headerTitle: "Profile" }}
      ></SearchStack.Screen>
      <SearchStack.Screen
        name={"Post"}
        component={PostScreen}
        options={{ headerTitle: "Post" }}
      ></SearchStack.Screen>
      <SearchStack.Screen
        name={"Category"}
        component={CategoryScreen}
        options={{ headerTitle: "Category" }}
      ></SearchStack.Screen>
    </SearchStack.Navigator>
  );
};

export default SearchStackScreen;
