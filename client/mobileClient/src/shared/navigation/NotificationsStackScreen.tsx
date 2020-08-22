import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NotificationsScreen from "../../screens/notifications/NotificationsScreen";
import PostScreen from "../../screens/post/PostScreen";
import ProfileScreen from "../../screens/profile/ProfileScreen";
import { PostViewModel } from "../../api/posts/PostsApiModel";

export type NotificationsStackParamList = {
  Notifications: undefined;
  Post: { post: PostViewModel };
  Profile: { userId: string };
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
    </NotificationsStack.Navigator>
  );
};

export default NotificationsStackScreen;
