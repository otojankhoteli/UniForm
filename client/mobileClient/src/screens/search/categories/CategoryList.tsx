import React, { useMemo } from "react";
import { CategoryViewModel } from "../../../api/categories/CategoriesApiModel";
import { FlatList, View, ActivityIndicator } from "react-native";
import CategoryListItem from "./CategoryListItem";
import FloatingButton from "../../../shared/components/FloatingButton";
import { useNavigation } from "@react-navigation/native";

interface Props {
  readonly searchTerm: string;
  readonly visible: boolean;
}

const CategoryList: React.FC<Props> = (props) => {
  const navigation = useNavigation();

  const tempData = useMemo(() => {
    let data: CategoryViewModel[] = [];
    for (let i = 1; i < 18; i++) {
      data.push({
        author: {
          email: "g",
          id: "1",
          name: "ako",
          photoURL: "",
          role: "student",
          surname: "javaxa",
        },
        id: "1",
        isVerified: true,
        memberCount: 10,
        name: "Category" + i,
        description: "Category Description",
        photoUri: "",
        postCount: 100,
      });
    }
    return data;
  }, []);

  if (!props.visible)
    return <ActivityIndicator style={{ marginTop: 20 }} size="large" />;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={tempData}
        keyExtractor={(_, index) => {
          return index.toString();
        }}
        renderItem={(item) => {
          return <CategoryListItem categoryData={item.item}></CategoryListItem>;
        }}
      ></FlatList>
      <FloatingButton
        onPress={() => {
          navigation.navigate("AddCategory");
        }}
        color={"rgba(32,255,64,1)"}
        type={"add"}
      />
    </View>
  );
};

export default CategoryList;
