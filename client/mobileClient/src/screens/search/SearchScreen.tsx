import React, { useState } from "react";
import { View, TextInput, TouchableHighlight, Text } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { Button } from "react-native-elements";
import FloatingButton from "../../shared/components/FloatingButton";
import CategoryList from "./CategoryList";
import { CategoryViewModel } from "../../api/categories/CategoriesApiModel";

const SearchScreen: React.FC = () => {
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
          alert("new category");
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
    postCount: 100,
  },
  {
    author: "ako",
    id: "1",
    isVerified: true,
    memberCount: 10,
    name: "Category2",
    postCount: 100,
  },
  {
    author: "ako",
    id: "1",
    isVerified: true,
    memberCount: 10,
    name: "Category3",
    postCount: 100,
  },
  {
    author: "ako",
    id: "1",
    isVerified: true,
    memberCount: 10,
    name: "Category4",
    postCount: 100,
  },
  {
    author: "ako",
    id: "1",
    isVerified: true,
    memberCount: 10,
    name: "Category5",
    postCount: 100,
  },
  {
    author: "ako",
    id: "1",
    isVerified: true,
    memberCount: 10,
    name: "Category6",
    postCount: 100,
  },
  {
    author: "ako",
    id: "1",
    isVerified: true,
    memberCount: 10,
    name: "Category7",
    postCount: 100,
  },
  {
    author: "ako",
    id: "1",
    isVerified: true,
    memberCount: 10,
    name: "Category8",
    postCount: 100,
  },
  {
    author: "ako",
    id: "1",
    isVerified: true,
    memberCount: 10,
    name: "Category9",
    postCount: 100,
  },
  {
    author: "ako",
    id: "1",
    isVerified: true,
    memberCount: 10,
    name: "Category10",
    postCount: 100,
  },
  {
    author: "ako",
    id: "1",
    isVerified: true,
    memberCount: 10,
    name: "Category11",
    postCount: 100,
  },
  {
    author: "ako",
    id: "1",
    isVerified: true,
    memberCount: 10,
    name: "Category12",
    postCount: 100,
  },
  {
    author: "ako",
    id: "1",
    isVerified: true,
    memberCount: 10,
    name: "Category13",
    postCount: 100,
  },
  {
    author: "ako",
    id: "1",
    isVerified: true,
    memberCount: 10,
    name: "Category14",
    postCount: 100,
  },
  {
    author: "ako",
    id: "1",
    isVerified: true,
    memberCount: 10,
    name: "Category15",
    postCount: 100,
  },
  {
    author: "ako",
    id: "1",
    isVerified: true,
    memberCount: 10,
    name: "Category17",
    postCount: 100,
  },
];
