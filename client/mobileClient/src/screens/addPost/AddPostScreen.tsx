import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';

export default function AddPostScreen() {

  const onSubmit = () => {

  }

  return <View style={styles.container}>
    <View style={styles.submitButtonContainer}>
      <Button
        buttonStyle={styles.submitButton}
        onPress={onSubmit}
        icon={<Icon name="check" type='font-awesome' color="white" size={25} style={styles.submitButtonIcon} ></Icon>}
      ></Button>
    </View>
  </View>;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  submitButtonContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderWidth: 1,
    borderColor: "red",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  submitButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: "auto",
    backgroundColor: "green"
  },
  submitButtonIcon: {
  },
});