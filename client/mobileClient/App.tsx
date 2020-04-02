import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { LoginScreen } from './src/screens/login/LoginScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <LoginScreen></LoginScreen>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
