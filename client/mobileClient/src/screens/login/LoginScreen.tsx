import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ImageBackground,
  TextInput,
} from "react-native";
import { Button, SocialIcon } from "react-native-elements";
import * as GoogleSignIn from "expo-google-sign-in";
import { MainColor } from "../../shared/Const";
import { useGlobalState } from "../../shared/globalState/AppContext";
import { useSignUp } from "../../api/auth/AuthApiHook";
import { useTokenRefreshHandler } from "../../shared/auth/AuthHook";
// const BackgroundImage = require('../../../assets/backgroundImage.jpg');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const BackgroundImage2 = require("../../../assets/backgroundImage2.jpg");

export default function LoginScreen() {
  const [, dispatch] = useGlobalState();
  const [user, setUser] = useState<GoogleSignIn.GoogleUser | null>();
  const { post } = useSignUp();

  useEffect(() => {
    GoogleSignIn.initAsync()
      .then(async () => {
        await fetchUser();
      })
      .catch((error) => {
        dispatch({
          type: "setError",
          exception: {
            type: "GoogleSignInException",
            message: "Failed to setup google sign in"
          }
        });
      });
  }, []);

  useEffect(() => {
    // if (user) {
    //   post({
    //     googleAccessToken: user.auth.accessToken,
    //     googleClientId: user.auth.clientId
    //   });
    // }
  }, [user])

  const fetchUser = async () => {
    const user = await GoogleSignIn.signInSilentlyAsync();
    setUser(user);
  };

  const signOutAsync = async () => {
    await GoogleSignIn.signOutAsync().catch((error) => {
      alert(`error in signOutAsync${JSON.stringify(error)}`);
    });
    setUser(null);
  };

  const signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === "success") {
        // await fetchUser();
        setUser(user);
      }
    } catch (exception) {
      alert(`error in signInAsync${JSON.stringify(exception)}`);
      dispatch({
        type: "setError",
        exception: {
          type: "GoogleSignInException",
          message: "Failed to sign in"
        }
      })
    }
  };

  const onPress = useCallback(() => {
    if (user) {
      signOutAsync();
    } else {
      signInAsync();
    }
  }, [user]);

  return (
    <ImageBackground
      resizeMode="cover"
      source={BackgroundImage2}
      style={styles.backgroundImage}
      blurRadius={2}
    >
      <Text style={styles.welcomeText}>Welcome8</Text>
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
      <TextInput style={{ borderRadius: 1, borderColor: "red" }} multiline>{user && JSON.stringify(user)}</TextInput>
      {/* <TextInput style={{ borderRadius: 1, borderColor: "red" }} multiline>{user && user.auth && user.auth.accessToken}</TextInput> */}
      {/* <TextInput style={{ borderRadius: 1, borderColor: "red" }} multiline>{user && user.serverAuthCode}</TextInput> */}
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
