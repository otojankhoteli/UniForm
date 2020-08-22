import React, { useState } from "react";
import { View, TextInput, TouchableHighlight, Text } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { Button } from "react-native-elements";
import FloatingButton from "../../shared/components/FloatingButton";
import CategoryList from "./CategoryList";
import { CategoryViewModel } from "../../api/categories/CategoriesApiModel";
import { useNavigation } from "@react-navigation/native";

const SearchScreen: React.FC = () => {
  const navigation = useNavigation();

  const [inputText, setInputText] = useState("");

  return (
    <View style={{ flex: 1, backgroundColor: "rgba(255, 255, 255, 1)" }}>
      <View
        style={{
          height: 50,
          margin: 10,
          borderWidth: 0.5,
          borderColor: "black",
          borderRadius: 10,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <FeatherIcon name={"search"} size={30} />
        <TextInput
          style={{ flex: 1, marginLeft: 10, fontSize: 16 }}
          placeholder={"Search Categories..."}
          value={inputText}
          onChangeText={(text) => {
            setInputText(text);
          }}
          onSubmitEditing={() => {
            alert("search for " + inputText);
          }}
        />
      </View>
      <CategoryList data={tempData} />
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

export default SearchScreen;

const tempData: CategoryViewModel[] = [
  {
    author: "ako",
    id: "1",
    isVerified: true,
    memberCount: 10,
    name: "Category1",
    description: "Category Description",
    postCount: 100,
  },
  {
    author: "ako",
    id: "1",
    isVerified: true,
    memberCount: 10,
    name: "Category2",
    description: "Category Description",
    postCount: 100,
  },
  {
    author: "ako",
    id: "1",
    isVerified: true,
    memberCount: 10,
    name: "Category3",
    description: "Category Description",
    postCount: 100,
  },
  {
    author: "ako",
    id: "1",
    isVerified: true,
    memberCount: 10,
    name: "Category4",
    description: "Category Description",
    postCount: 100,
  },
  {
    author: "ako",
    id: "1",
    isVerified: true,
    memberCount: 10,
    name: "Category5",
    description: "Category Description",
    postCount: 100,
  },
  {
    author: "ako",
    id: "1",
    isVerified: true,
    memberCount: 10,
    name: "Category6",
    description: "Category Description",
    postCount: 100,
  },
  {
    author: "ako",
    id: "1",
    isVerified: true,
    memberCount: 10,
    name: "Category7",
    description: "Category Description",
    postCount: 100,
  },
  {
    author: "ako",
    id: "1",
    isVerified: true,
    memberCount: 10,
    name: "Category8",
    description: "Category Description",
    postCount: 100,
  },
  {
    author: "ako",
    id: "1",
    isVerified: true,
    memberCount: 10,
    name: "Category9",
    description: "Category Description",
    postCount: 100,
  },
  {
    author: "ako",
    id: "1",
    isVerified: true,
    memberCount: 10,
    name: "Category10",
    description: "Category Description",
    postCount: 100,
  },
  {
    author: "ako",
    id: "1",
    isVerified: true,
    memberCount: 10,
    name: "Category11",
    description: "Category Description",
    postCount: 100,
  },
  {
    author: "ako",
    id: "1",
    isVerified: true,
    memberCount: 10,
    name: "Category12",
    description: "Category Description",
    postCount: 100,
  },
  {
    author: "ako",
    id: "1",
    isVerified: true,
    memberCount: 10,
    name: "Category13",
    description: "Cateogyr Description",
    postCount: 100,
  },
  {
    author: "ako",
    id: "1",
    isVerified: true,
    memberCount: 10,
    name: "Category14",
    description: "Cateogyr Description",
    postCount: 100,
  },
  {
    author: "ako",
    id: "1",
    isVerified: true,
    memberCount: 10,
    name: "Category15",
    description: "Cateogyr Description",
    postCount: 100,
  },
  {
    author: "ako",
    id: "1",
    isVerified: true,
    memberCount: 10,
    name: "Category17",
    description: "Cateogyr Description",
    postCount: 100,
  },
];
