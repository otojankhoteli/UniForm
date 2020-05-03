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
import { Notifications } from 'expo';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainColor } from "../../shared/Const";
import { useGlobalState } from "../../shared/globalState/AppContext";
import { useSignUp } from "../../api/auth/AuthApiHook";
import { useTokenRefreshHandler } from "../../shared/auth/AuthHook";
import { RootStackParamList } from "../StartUpScreen";
// const BackgroundImage = require('../../../assets/backgroundImage.jpg');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const BackgroundImage2 = require("../../../assets/backgroundImage2.jpg");

export default function DevelopmentLoginScreen() {
  const [, dispatch] = useGlobalState();
  const { post, result, isError, isLoading, error } = useSignUp();
  const [accessToken, setAccessToken] = useState("");

  const navigation = useNavigation<StackNavigationProp<
    RootStackParamList
  >>();


  console.log("Error", error);

  useEffect(() => {
    if (result && !isError) {
      dispatch({
        type: "setLoggedInUser",
        account: result
      });
      navigation.navigate("Home")
    }
  }, [result, isError]);

  const onPress = async () => {
    const deviceId = await Notifications.getExpoPushTokenAsync();
    console.log("onPress", deviceId, accessToken)
    post({
      deviceId,
      accessToken,
    });
  };

  return (
    <ImageBackground
      resizeMode="cover"
      source={BackgroundImage2}
      style={styles.backgroundImage}
      blurRadius={2}
    >
      <Text style={styles.welcomeText}>Welcome Development Login</Text>
      <TextInput onChangeText={(text) => setAccessToken(text)} style={{ borderRadius: 1, borderColor: "red" }} multiline>{accessToken}</TextInput>
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
