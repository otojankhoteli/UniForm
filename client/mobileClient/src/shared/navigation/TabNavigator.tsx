import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackScreen from "./HomeStackScreen";
import SearchStackScreen from "./SearchStackScreen";
import NotificationsStackScreen from "./NotificationsStackScreen";
import ProfileStackScreen from "./ProfileStackScreen";
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import FeatherIcon from "react-native-vector-icons/Feather";

export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Notification: undefined;
  ProfileStack: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const MainNavigator: React.FC = () => {
  return (
    <Tab.Navigator tabBarOptions={{ showLabel: false }}>
      <Tab.Screen
        name={"Home"}
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ focused, color }) => {
            return (
              <SimpleLineIcon
                name={"feed"}
                size={focused ? 27 : 24}
                color={color}
              ></SimpleLineIcon>
            );
          },
        }}
      ></Tab.Screen>
      <Tab.Screen
        name={"Search"}
        component={SearchStackScreen}
        options={{
          tabBarIcon: ({ focused, color }) => {
            return (
              <FeatherIcon
                name={"search"}
                size={focused ? 33 : 30}
                color={color}
              ></FeatherIcon>
            );
          },
        }}
      ></Tab.Screen>
      <Tab.Screen
        name={"Notification"}
        component={NotificationsStackScreen}
        options={{
          tabBarIcon: ({ focused, color }) => {
            return (
              <MaterialIcon
                name={"notifications"}
                size={focused ? 33 : 30}
                color={color}
              ></MaterialIcon>
            );
          },
        }}
      ></Tab.Screen>
      <Tab.Screen
        name={"ProfileStack"}
        component={ProfileStackScreen}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused, color }) => {
            return (
              <FontAwesomeIcon
                name={"user-alt"}
                size={focused ? 27 : 24}
                color={color}
              ></FontAwesomeIcon>
            );
          },
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default MainNavigator;
