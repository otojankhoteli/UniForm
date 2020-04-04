import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
const BackgroundImage2 = require('../../../assets/splash.png');


export default function SplashScreen() {
  return <ImageBackground source={BackgroundImage2} style={styles.backgroundImage} blurRadius={2}>
  </ImageBackground>
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});