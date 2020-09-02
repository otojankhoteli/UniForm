import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ImageBackground,
  TextInput,
} from "react-native";
import { Button, SocialIcon } from "react-native-elements";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainColor } from "../../shared/Const";
import { useGlobalState } from "../../shared/globalState/AppContext";
import { useSignUp } from "../../api/auth/AuthApiHook";
import { useTokenRefreshHandler } from "../../shared/auth/AuthHook";
import { navigate } from "../../shared/navigation/RootNavigation";
// const BackgroundImage = require('../../../assets/backgroundImage.jpg');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const BackgroundImage2 = require("../../../assets/backgroundImage2.jpg");

export default function DevelopmentLoginScreen() {
  const [, dispatch] = useGlobalState();
  const { post, result, isError, isLoading, error } = useSignUp();
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    if (result && !isError) {
      console.log("result", result, isError);
      dispatch({
        type: "setLoggedInUser",
        account: result,
      });
      // navigate("Home");
    }
  }, [result, isError]);

  const onPress = async () => {
    let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    const deviceId = await Notifications.getExpoPushTokenAsync();
    post({
      deviceId,
      accessToken:
        "ya29.a0AfH6SMD4RlnH6HDTxxw6OOGgPgkxW1n2oL3fR0mwll-xGDeKQBe418dkMpczfjcVQcQ4JYj3bSqDz6ye4N5AQ4GjhoNWUHiR8aizL_7Uh1BsV8FP66nWLVsfVGi2LK9fLm4uLxUvOC_kJUDE16iGfRHLYFW_uUFITuc",
    });
  };

  return (
    <ImageBackground
      resizeMode="cover"
      source={BackgroundImage2}
      style={styles.backgroundImage}
      blurRadius={2}
    >
      <Text style={styles.welcomeText}>Welcome</Text>
      <View style={styles.signInButtons}>
        <Button
          type="solid"
          buttonStyle={styles.googleSignInButton}
          titleStyle={styles.googleSignInButtonTitle}
          icon={
            <SocialIcon
              style={styles.googleSignInButtonIcon}
              iconSize={24}
              type="google"
            />
          }
          title="Sign in with Google"
          onPress={onPress}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  googleSignInButton: {
    backgroundColor: "white",
    borderRadius: 30,
    elevation: 2,
    height: 60,
  },
  googleSignInButtonIcon: {
    height: 40,
    width: 40,
  },
  googleSignInButtonTitle: {
    color: MainColor,
  },
  signInButtons: {
    marginBottom: "auto",
  },
  welcomeText: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: "auto",
    marginTop: (StatusBar.currentHeight || 0) + 60,
  },
});
