import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NotificationsScreen from "../../screens/notifications/NotificationsScreen";
import PostScreen from "../../screens/post/PostScreen";
import ProfileScreen from "../../screens/profile/ProfileScreen";
import { PostViewModel } from "../../api/posts/PostsApiModel";
import CategoryScreen from "../../screens/category/CategoryScreen";

export type NotificationsStackParamList = {
  Notifications: undefined;
  Post: { postId: string };
  Profile: { userId: string };
  Category: { categoryId: string; categoryName: string };
};

const NotificationsStack = createStackNavigator<NotificationsStackParamList>();

const NotificationsStackScreen: React.FC = () => {
  return (
    <NotificationsStack.Navigator>
      <NotificationsStack.Screen
        name={"Notifications"}
        component={NotificationsScreen}
        options={{ headerTitle: "Notifications" }}
      ></NotificationsStack.Screen>
      <NotificationsStack.Screen
        name={"Post"}
        component={PostScreen}
        options={{ headerTitle: "Post" }}
      ></NotificationsStack.Screen>
      <NotificationsStack.Screen
        name={"Profile"}
        component={ProfileScreen}
        options={{ headerTitle: "Profile" }}
      ></NotificationsStack.Screen>
      <NotificationsStack.Screen
        name={"Category"}
        component={CategoryScreen}
        options={{ headerTitle: "Category" }}
      ></NotificationsStack.Screen>
    </NotificationsStack.Navigator>
  );
};

export default NotificationsStackScreen;
