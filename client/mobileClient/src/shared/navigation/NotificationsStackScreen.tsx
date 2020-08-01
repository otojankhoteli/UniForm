import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NotificationsScreen from "../../screens/notifications/NotificationsScreen";

const NotificationsStack = createStackNavigator();

const NotificationsStackScreen: React.FC = () => {
  return (
    <NotificationsStack.Navigator>
      <NotificationsStack.Screen
        name={"Notifications"}
        component={NotificationsScreen}
        options={{ headerTitle: "Notifications" }}
      ></NotificationsStack.Screen>
    </NotificationsStack.Navigator>
  );
};

export default NotificationsStackScreen;
