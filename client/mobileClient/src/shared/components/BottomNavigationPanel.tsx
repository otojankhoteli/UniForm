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
      icon={<Icon name="university" type='font-awesome' color="white" size={15} style={styles.homeButtonIcon} ></Icon>}
    />
    <Button
      buttonStyle={styles.addButton}
      onPress={onAddClick}
      icon={<Icon name="plus" type='font-awesome' color="white" size={25} style={styles.addButtonIcon} ></Icon>}
    ></Button>
    <Button
      buttonStyle={styles.optionButton}
      icon={<Icon name="adjust" type='font-awesome' color="white" size={15} style={styles.optionButtonIcon} ></Icon>}
    ></Button>
  </View>;
}

const mainColor = "#0d2b5b";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    position: 'absolute',
    bottom: 0,
    width: "100%",
    elevation: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'rgba(250, 256, 256, 1)'
  },
  homeButton: {
    height: 35,
    width: 35,
    marginRight: "auto",
    backgroundColor: mainColor
  },
  homeButtonIcon: {
  },
  addButton: {
    height: 50,
    borderRadius: 25,
    width: 50,
    marginLeft: 70,
    marginRight: 70,
    backgroundColor: mainColor
  },
  addButtonIcon: {
  },
  optionButton: {
    height: 35,
    width: 35,
    backgroundColor: mainColor
  },
  optionButtonIcon: {
  },
  backgroundImageStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});