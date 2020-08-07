import React from "react";
import { CategoryViewModel } from "../../api/categories/CategoriesApiModel";
import { FlatList, View } from "react-native";
import CategoryListItem from "./CategoryListItem";

interface Props {
  readonly data: CategoryViewModel[];
}

const CategoryList: React.FC<Props> = (props) => {
  return (
    <FlatList
      data={props.data}
      keyExtractor={(_, index) => {
        return index.toString();
      }}
      renderItem={(item) => {
        return <CategoryListItem categoryData={item.item}></CategoryListItem>;
      }}
    ></FlatList>
  );
};

export default CategoryList;
