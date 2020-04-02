import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, StatusBar, ImageBackground, Image } from 'react-native';
import { Button, SocialIcon } from 'react-native-elements';
import * as GoogleSignIn from 'expo-google-sign-in';
const BackgroundImage = require('../../../assets/backgroundImage.jpg');
const BackgroundImage2 = require('../../../assets/backgroundImage2.jpg');

export function LoginScreen() {
  const [user, setUser] = useState<GoogleSignIn.GoogleUser | null>();

  useEffect(() => {
    GoogleSignIn.initAsync({
    }).then(async () => {
      await fetchUser();
    })
  }, []);

  const fetchUser = async () => {
    const user = await GoogleSignIn.signInSilentlyAsync();
    setUser(user)
  }

  const signOutAsync = async () => {
    await GoogleSignIn.signOutAsync();
    setUser(null);
  };

  const signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      this.setState({ type, result: user })
      if (type === 'success') {
        await fetchUser();
      }
    } catch (exception) {
      alert('login: Error:' + exception);
    }
  };

  const onPress = useCallback(() => {
    if (user) {
      signOutAsync();
    } else {
      signInAsync();
    }
  }, [user]);

  return <React.Fragment>
    <ImageBackground source={BackgroundImage2} style={styles.backgroundImageStyle} blurRadius={2}>
      <Text style={styles.welcomeText}>Welcome</Text>
      <View style={styles.signInButtons}>
        <Button type="solid"
          buttonStyle={styles.googleSignInButton}
          titleStyle={styles.googleSignInButtonTitle}
          icon={<SocialIcon style={styles.googleSignInButtonIcon} iconSize={24} type="google"></SocialIcon>}
          title="Sign in with Google" onPress={onPress} />
      </View>
      <Text>test 1</Text>
      <Text>{user && user.photoURL}</Text>
      <Text>{user && user.firstName}</Text>
      <Text>{user && user.lastName}</Text>
    </ImageBackground>
  </React.Fragment>;
}

const mainColor = "#0d2b5b"
const styles = StyleSheet.create({
  backgroundImageStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleSignInButton: {
    borderRadius: 30,
    height: 60,
    elevation: 2,
    backgroundColor: 'white',
  },
  googleSignInButtonTitle: {
    color: mainColor,
  },
  googleSignInButtonIcon: {
    height: 40,
    width: 40
  },
  signInButtons: {
    marginBottom: "auto"
  },
  welcomeText: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: StatusBar.currentHeight + 60,
    marginBottom: "auto",
    color: 'white'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
