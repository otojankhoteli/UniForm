import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { CategoryViewModel } from "../../api/categories/CategoriesApiModel";
import HorizontalLine from "../../shared/components/HorizontalLine";
import { MainColor } from "../../shared/Const";

interface Props {
  onCategoryClick: (category: CategoryViewModel) => void;
  category: CategoryViewModel;
}
export default function CategoryListItem({ category, onCategoryClick }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ marginBottom: 5 }}
        onPress={() => onCategoryClick(category)}
      >
        <View style={styles.innerContainer}>
          <View style={{ marginRight: "auto" }}>
            <Text style={styles.categoryTitle}>u/{category.name}</Text>
            {category.isVerified ? (
              <Icon
                size={15}
                containerStyle={styles.verifiedIcon}
                color="#33A6EB"
                name="certificate"
                type="font-awesome"
              />
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  categoryTitle: {
    color: MainColor,
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 1,
    padding: 10,
    marginTop: 5,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  verifiedIcon: {
    marginTop: 8,
  },
});
