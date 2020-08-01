import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../../screens/profile/ProfileScreen";

const ProfileStack = createStackNavigator();

const ProfileStackScreen: React.FC = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name={"Profile"}
        component={ProfileScreen}
        options={{ headerTitle: "Profile" }}
      ></ProfileStack.Screen>
    </ProfileStack.Navigator>
  );
};

export default ProfileStackScreen;
