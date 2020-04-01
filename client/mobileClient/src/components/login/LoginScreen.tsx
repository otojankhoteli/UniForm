import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Button, SocialIcon } from 'react-native-elements';
import * as GoogleSignIn from 'expo-google-sign-in';

export class AuthScreen extends React.Component {
  state = { user: null, type: null, result: null };

  componentDidMount() {
    this.initAsync();
  }

  initAsync = async () => {
    await GoogleSignIn.initAsync({

    });
    this._syncUserWithStateAsync();
  };

  _syncUserWithStateAsync = async () => {
    const user = await GoogleSignIn.signInSilentlyAsync();
    this.setState({ user });
  };

  signOutAsync = async () => {
    await GoogleSignIn.signOutAsync();
    this.setState({ user: null });
  };

  signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      this.setState({ type, result: user })
      if (type === 'success') {
        this._syncUserWithStateAsync();
      }
    } catch (exception) {
      alert('login: Error:' + exception);
    }
  };

  onPress = () => {
    if (this.state.user) {
      this.signOutAsync();
    } else {
      this.signInAsync();
    }
  };

  render() {
    return <React.Fragment>
      <Text style={styles.welcomeText}>Welcome To UniForm</Text>
      <View style={styles.signInButtons}>
        <Button type="solid"
          buttonStyle={styles.googleSignInButton}
          titleStyle={styles.googleSignInButtonTitle}
          icon={<SocialIcon style={styles.googleSignInButtonIcon} iconSize={24} type="google"></SocialIcon>}
          title="Sign in with Google" onPress={this.onPress} />
      </View>
      <Text>{this.state.user}</Text>
    </React.Fragment>;
  }
}

const mainColor = "#07EEFF"
const styles = StyleSheet.create({
  googleSignInButton: {
    borderRadius: 30,
    height: 60,
    elevation: 2,
    backgroundColor: mainColor,
  },
  googleSignInButtonTitle: {
    color: "white",
  },
  googleSignInButtonIcon: {
    height: 40,
    width: 40
  },
  signInButtons: {
    marginBottom: "auto"
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "bold",
    // fontFamily: "Cochin",
    marginTop: StatusBar.currentHeight + 60,
    marginBottom: "auto",
    color: mainColor
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
