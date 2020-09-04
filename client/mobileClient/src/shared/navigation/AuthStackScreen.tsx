import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DevelopmentLoginScreen from "../../screens/login/DevelopmentLoginScreen";
import LoginScreen from "../../screens/login/LoginScreen";

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
        component={LoginScreen}
      ></AuthStack.Screen>
    </AuthStack.Navigator>
  );
};

export default AuthStackScreen;
