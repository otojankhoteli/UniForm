import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { AuthScreen } from './src/components/login/LoginScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <AuthScreen></AuthScreen>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
