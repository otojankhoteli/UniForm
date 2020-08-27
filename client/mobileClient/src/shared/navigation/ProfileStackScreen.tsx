import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../../screens/profile/ProfileScreen";
import PostScreen from "../../screens/post/PostScreen";
import { PostViewModel } from "../../api/posts/PostsApiModel";
import EditProfileScreen from "../../screens/editProfile/EditProfileScreen";
import CategoryScreen from "../../screens/category/CategoryScreen";

export type ProfileStackParamList = {
  Post: { post: PostViewModel };
  Profile: { userId: string };
  EditProfile: undefined;
  Category: { categoryId: string; categoryName: string };
};

const ProfileStack = createStackNavigator<ProfileStackParamList>();

const ProfileStackScreen: React.FC = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name={"Profile"}
        component={ProfileScreen}
        options={{ headerTitle: "Profile" }}
      ></ProfileStack.Screen>
      <ProfileStack.Screen
        name={"EditProfile"}
        component={EditProfileScreen}
        options={{ headerTitle: "Edit Profile" }}
      ></ProfileStack.Screen>
      <ProfileStack.Screen
        name={"Post"}
        component={PostScreen}
        options={{ headerTitle: "Post" }}
      ></ProfileStack.Screen>
      <ProfileStack.Screen
        name={"Category"}
        component={CategoryScreen}
        options={{ headerTitle: "Category" }}
      ></ProfileStack.Screen>
    </ProfileStack.Navigator>
  );
};

export default ProfileStackScreen;
