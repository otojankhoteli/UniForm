import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';

interface Props {
  onAddClick: () => void
}
export default function BottomNavigationPanel({ onAddClick }: Props) {
  return <View style={styles.container}>
    <Button type="solid"
      buttonStyle={styles.homeButton}
      icon={<Icon name="university" type='font-awesome' color="white" size={15} style={styles.homeButtonIcon} />}
    />
    <Button
      buttonStyle={styles.addButton}
      onPress={onAddClick}
      icon={<Icon name="plus" type='font-awesome' color="white" size={25} style={styles.addButtonIcon} />}
    />
    <Button
      buttonStyle={styles.optionButton}
      icon={<Icon name="adjust" type='font-awesome' color="white" size={15} style={styles.optionButtonIcon} />}
    />
  </View>;
}

const mainColor = "#0d2b5b";
const styles = StyleSheet.create({
  addButton: {
    backgroundColor: mainColor,
    borderRadius: 25,
    height: 50,
    marginLeft: 70,
    marginRight: 70,
    width: 50
  },
  addButtonIcon: {
  },
  container: {
    alignItems: "center",
    backgroundColor: 'rgba(250, 256, 256, 1)',
    bottom: 0,
    elevation: 20,
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    position: 'absolute',
    width: "100%"
  },
  homeButton: {
    backgroundColor: mainColor,
    height: 35,
    marginRight: "auto",
    width: 35
  },
  homeButtonIcon: {
  },
  optionButton: {
    backgroundColor: mainColor,
    height: 35,
    width: 35
  },
  optionButtonIcon: {
  },
});