import React, { useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, StackHeaderProps } from "@react-navigation/stack";
import { Button } from "react-native-elements";
import { View } from "react-native";
import SplashScreen from "../shared/components/SplashScreen";
import { useGlobalState } from "../shared/globalState/AppContext";
import { useAccount, useAccountPersist } from "../shared/persist/PersistHooks";
import AddPostScreen from "./addPost/AddPostScreen";
import HomeScreen from "./home/HomeScreen";
import ChooseCategoryScreen from "./postCategories/ChooseCategoryScreen";
import { CategoryViewModel } from "../api/categories/CategoriesApiModel";
import DevelopmentLoginScreen from "./login/DevelopmentLoginScreen";
import { useTokenRefreshHandler } from "../shared/auth/AuthHook";
import { navigationRef } from "../shared/navigation/RootNavigation";

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  AddPost: { category: CategoryViewModel };
  ChooseCategory: undefined;
  Feed: { sort: 'latest' | 'top' } | undefined;
};
const Stack = createStackNavigator();



function Header(props: { tintColor?: string; }): React.ReactNode {
  return <View style={{ borderColor: "red", borderWidth: 1, height: 40 }}>
    <Button containerStyle={{ height: 20 }} onPress={() => { console.log("test") }} title="Next" />
  </View>
}
export default function StartUpScreen() {
  const [, dispatch] = useGlobalState();
  const { isLoading, account } = useAccount();

  useAccountPersist();
  useTokenRefreshHandler();

  useEffect(() => {
    if (account) {
      console.log("setLoggedInUser")
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
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {!account ? (
          <Stack.Screen
            name="Login"
            component={DevelopmentLoginScreen}
            options={{ headerShown: false }}
          />
        ) : (
            <>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Login"
                component={DevelopmentLoginScreen}
                options={{ headerShown: false }}
              />
            </>
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
