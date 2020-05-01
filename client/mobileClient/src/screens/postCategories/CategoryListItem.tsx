import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { CategoryViewModel } from '../../api/categories/CategoriesApiModel';
import HorizontalLine from '../../shared/components/HorizontalLine';
import { MainColor } from '../../shared/Const';

interface Props {
  onCategoryClick: (category: CategoryViewModel) => void;
  category: CategoryViewModel
}
export default function CategoryListItem({ category, onCategoryClick }: Props) {
  return <TouchableOpacity style={styles.container} onPress={() => onCategoryClick(category)}>
    <View style={styles.innerContainer}>
      <Text style={styles.categoryTitle}>u/{category.name}</Text>
      {category.isVerified ? <Icon size={15} containerStyle={styles.verifiedIcon} color="#33A6EB" name="certificate" type="font-awesome" /> : null}
    </View>
    <HorizontalLine mode="fill" />
  </TouchableOpacity>;
}
const styles = StyleSheet.create({
  categoryTitle: {
    color: MainColor,
    fontSize: 20,
    marginRight: 5
  },
  container: {
    height: 50,
    justifyContent: "center",
    padding: 10
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "center"
  },

  verifiedIcon: {
    marginRight: "auto",
    marginTop: 8,
  }
});