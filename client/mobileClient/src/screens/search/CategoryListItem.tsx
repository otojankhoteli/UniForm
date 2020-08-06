import React from "react";
import { CategoryViewModel } from "../../api/categories/CategoriesApiModel";
import { View, Text } from "react-native";

interface Props {
  readonly categoryData: CategoryViewModel;
}

const CategoryListItem: React.FC<Props> = (props) => {
  return (
    <View style={{ height: 50 }}>
      <Text>{props.categoryData.name}</Text>
    </View>
  );
};

export default CategoryListItem;
