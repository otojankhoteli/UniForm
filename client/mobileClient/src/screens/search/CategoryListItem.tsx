import React from "react";
import { CategoryViewModel } from "../../api/categories/CategoriesApiModel";
import { View, Text } from "react-native";
import AvatarCustom from "../../shared/components/Avatar";

interface Props {
  readonly categoryData: CategoryViewModel;
}

const CategoryListItem: React.FC<Props> = (props) => {
  return (
    <View
      style={{
        height: 50,
        padding: 10,
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <AvatarCustom photoUrl={""} />
      <Text style={{ fontSize: 16, marginLeft: 10 }}>
        u/<Text style={{ fontWeight: "bold" }}>{props.categoryData.name}</Text>
      </Text>
    </View>
  );
};

export default CategoryListItem;
