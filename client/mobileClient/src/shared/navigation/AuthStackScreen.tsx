import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DevelopmentLoginScreen from "../../screens/login/DevelopmentLoginScreen";

const AuthStack = createStackNavigator();

const AuthStackScreen: React.FC = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen
        name={"Login"}
        component={DevelopmentLoginScreen}
      ></AuthStack.Screen>
    </AuthStack.Navigator>
  );
};

export default AuthStackScreen;
