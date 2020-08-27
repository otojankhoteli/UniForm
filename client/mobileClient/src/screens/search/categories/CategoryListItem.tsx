import React from "react";
import { View, Text, TouchableHighlight, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { CategoryViewModel } from "../../../api/categories/CategoriesApiModel";
import { useNavigation } from "@react-navigation/native";
import { SearchStackParamList } from "../../../shared/navigation/SearchStackScreen";
import { StackNavigationProp } from "@react-navigation/stack";

interface Props {
  readonly categoryData: CategoryViewModel;
}

const CategoryListItem: React.FC<Props> = (props) => {
  const navigation = useNavigation<
    StackNavigationProp<SearchStackParamList, "Search">
  >();

  return (
    <TouchableHighlight
      style={{
        margin: 5,
        padding: 10,
        backgroundColor: "white",
        elevation: 5,
        borderRadius: 5,
      }}
      underlayColor={"rgba(0,0,0,0.05)"}
      onPress={() => {
        navigation.push("Category", {
          categoryId: props.categoryData.id,
          categoryName: props.categoryData.name,
        });
      }}
    >
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Image
          style={{ width: 40, height: 40, borderRadius: 20 }}
          source={{
            uri:
              props.categoryData.photoUri ||
              "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.w3schools.com%2Fw3css%2Fimg_snowtops.jpg&f=1&nofb=1",
          }}
        ></Image>
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 18 }}>
            u/
            <Text style={{ fontWeight: "bold" }}>
              {props.categoryData.name}
            </Text>
          </Text>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>
            <Text style={{ color: "rgba(80,80,80,1)", fontWeight: "normal" }}>
              Created By{" "}
            </Text>
            s/{props.categoryData.author.name}{" "}
            {props.categoryData.author.surname}
          </Text>
          <Text style={{ marginTop: 5, fontSize: 16 }}>
            {props.categoryData.description}
          </Text>
          <Text style={{ marginTop: 5, fontSize: 15 }}>
            {`Members: ${props.categoryData.memberCount}  Posts: ${props.categoryData.postCount}`}
          </Text>
        </View>
        <TouchableHighlight
          style={{
            width: 40,
            height: 40,
            borderRadius: 25,
            marginLeft: "auto",
            justifyContent: "center",
            alignItems: "center",
          }}
          underlayColor={"rgba(0,0,0,0.1)"}
          onPress={() => {
            alert("subscribed");
          }}
        >
          <Icon
            color={false ? "#AA061A" : "gray"}
            size={20}
            solid={false}
            name={"heart"}
          />
        </TouchableHighlight>
      </View>
    </TouchableHighlight>
  );
};

export default CategoryListItem;
