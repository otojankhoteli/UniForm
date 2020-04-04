import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';


export default function BottomPanel() {
  return <View style={styles.container}>
    <Button></Button>
    <Button></Button>
    <Button></Button>
  </View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    position: 'absolute',
    bottom: 0,
    width: "100%",
    borderWidth: 1,
    borderColor: "red"
  },
  backgroundImageStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});