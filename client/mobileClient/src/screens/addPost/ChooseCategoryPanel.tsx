import React from "react";
import { Button } from "react-native-elements";
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import { MainColor } from "../../shared/Const";
import { CategoryViewModel } from "../../api/categories/CategoriesApiModel";

interface Props {
  onClick: () => void;
  chosenCategory?: CategoryViewModel;
  style?: StyleProp<ViewStyle>;
}
export default function ChooseCategoryPanel({
  style,
  chosenCategory,
  onClick,
}: Props) {
  return (
    <View style={[styles.container, style]}>
      <Text style={{ color: "rgb(120,120,120)", fontSize: 14, marginLeft: 5 }}>
        Category
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 5,
          borderRadius: 5,
          borderWidth: 0.5,
          borderColor: "rgba(0,0,0,0.3)",
          padding: 5,
          paddingTop: 3,
        }}
      >
        <Text style={styles.text}>u/</Text>
        {chosenCategory ? (
          <TouchableOpacity onPress={onClick}>
            <Text style={styles.text}>{chosenCategory.name}</Text>
          </TouchableOpacity>
        ) : (
          <Button
            onPress={onClick}
            containerStyle={styles.buttonContainer}
            type="clear"
            title="Choose Category"
          />
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  buttonContainer: {},
  container: {
    padding: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
