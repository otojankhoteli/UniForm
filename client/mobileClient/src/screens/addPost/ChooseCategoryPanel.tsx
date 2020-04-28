import React from 'react'
import { Button } from 'react-native-elements'
import { View, Text, StyleSheet, StyleProp, ViewStyle, TouchableOpacity } from 'react-native';
import { MainColor } from '../../shared/Const';
import { CategoryViewModel } from '../../api/categories/CategoriesApiModel';

interface Props {
  onClick: () => void;
  chosenCategory?: CategoryViewModel,
  style?: StyleProp<ViewStyle>,
}
export default function ChooseCategoryPanel({ style, chosenCategory, onClick }: Props) {
  return <View style={[styles.container, style]}>
    <Text style={styles.text}>u/</Text>
    {chosenCategory
      ?
      <TouchableOpacity onPress={onClick}>
        <Text style={styles.text}>
          {chosenCategory.name}
        </Text>
      </TouchableOpacity>
      : <Button onPress={onClick} containerStyle={styles.buttonContainer} type="outline" title="Choose Category" />}
  </View>
}
const styles = StyleSheet.create({
  buttonContainer: {
  },
  container: {
    alignItems: "center",
    backgroundColor: MainColor,
    flexDirection: "row",
    height: 100,
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 24
  }
});