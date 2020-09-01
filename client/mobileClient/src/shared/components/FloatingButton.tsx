import React from "react";
import { StyleSheet } from "react-native";
import { Button, Icon } from "react-native-elements";

interface Props {
  readonly onPress: () => void;
  readonly color: string;
  readonly type: "add" | "confirm";
  readonly disabled?: boolean;
  readonly loading?: boolean;
}

export default function FloatingButton(props: Props) {
  return (
    <Button
      containerStyle={styles.addButtonContainer}
      buttonStyle={{ ...styles.addButton, backgroundColor: props.color }}
      style={{ borderRadius: 50 }}
      onPress={props.onPress}
      disabled={props.disabled}
      iconContainerStyle={{ borderRadius: 50 }}
      icon={
        <Icon
          name={props.type == "add" ? "plus" : "check"}
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
    borderRadius: 50,
  },
});
