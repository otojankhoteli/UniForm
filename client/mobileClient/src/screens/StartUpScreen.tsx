import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./login/LoginScreen";
import SplashScreen from "../shared/components/SplashScreen";
import { useGlobalState } from "../shared/globalState/AppContext";
import { useAccount } from "../shared/persist/PersistHooks";
import AddPostScreen from "./addPost/AddPostScreen";
import HomeScreen from "./home/HomeScreen";
import ChooseCategoryScreen from "./postCategories/ChooseCategoryScreen";
import { CategoryViewModel } from "../api/categories/CategoriesApiModel";
import { useTokenRefreshHandler } from "../shared/auth/AuthHook";

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  AddPost: { category: CategoryViewModel };
  ChooseCategory: undefined;
  Feed: { sort: 'latest' | 'top' } | undefined;
};
const Stack = createStackNavigator();

export default function StartUpScreen() {
  const [, dispatch] = useGlobalState();
  const { isLoading, account } = useAccount();

  useEffect(() => {
    if (account) {
      dispatch({
        type: "setLoggedInUser",
        account,
      });
    }
  }, [account]);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        /> */}
        {!account ? (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        ) : (
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
          )}
        <Stack.Screen
          name="AddPost"
          component={AddPostScreen}
          options={{ headerTitle: "Add Post" }}
        />
        <Stack.Screen
          name="ChooseCategory"
          component={ChooseCategoryScreen}
          options={{ headerTitle: "Choose Category" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
