import React, { useEffect, Suspense } from "react";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "../components/SplashScreen";
import { useGlobalState } from "../globalState/AppContext";
import { useAccount, useAccountPersist } from "../persist/PersistHooks";
import { useTokenRefreshHandler } from "../auth/AuthHook";
import { navigationRef } from "./RootNavigation";
import AuthStackScreen from "./AuthStackScreen";
import { View } from "react-native";

const MainNavigator = React.lazy(() => import("./TabNavigator"));

export default function AppNavigator() {
  const [state, dispatch] = useGlobalState();
  const { isLoading, account } = useAccount();

  useAccountPersist();
  useTokenRefreshHandler();

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
    <NavigationContainer ref={navigationRef}>
      {false ? (
        <AuthStackScreen />
      ) : (
        <Suspense
          fallback={<View style={{ flex: 1, backgroundColor: "white" }}></View>}
        >
          <MainNavigator />
        </Suspense>
      )}
    </NavigationContainer>
  );
}
