import React from "react";
import { StyleSheet } from "react-native";
import { Button, Icon } from "react-native-elements";

interface Props {
  onPress: () => void;
  color: string;
}

export default function AddPostButton(props: Props) {
  return (
    <Button
      containerStyle={styles.addButtonContainer}
      buttonStyle={{ ...styles.addButton, backgroundColor: props.color }}
      onPress={props.onPress}
      icon={
        <Icon
          name="plus"
          type="font-awesome"
          color="white"
          size={25}
          style={styles.addButtonIcon}
        />
      }
    />
  );
}

const mainColor = "#0d2b5b";
const styles = StyleSheet.create({
  addButton: {
    backgroundColor: mainColor,
    borderRadius: 25,
    height: 50,
    width: 50,
    elevation: 7,
  },
  addButtonIcon: {},
  addButtonContainer: {
    position: "absolute",
    right: 15,
    bottom: 15,
  },
});
