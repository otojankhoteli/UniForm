import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './home/HomeScreen';
import LoginScreen from './login/LoginScreen';
import SplashScreen from '../shared/components/SplashScreen';
import { useGlobalState } from '../shared/globalState/AppContext';
import { useAccount } from '../shared/persist/PersistHooks';

const Stack = createStackNavigator();

export default function StartUpScreen() {
  const [, dispatch] = useGlobalState();
  const { isLoading, account } = useAccount();

  useEffect(() => {
    if (account) {
      dispatch({
        type: "setLoggedInUser",
        account
      });
    }
  }, [account]);

  if (isLoading) {
    return <SplashScreen></SplashScreen>
  }

  return <NavigationContainer>
    <Stack.Navigator>
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
            options={{ headerShown: false }} />
        )}
    </Stack.Navigator>
  </NavigationContainer>
}