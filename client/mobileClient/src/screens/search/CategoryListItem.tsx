import React from "react";
import { CategoryViewModel } from "../../api/categories/CategoriesApiModel";
import { View, Text, TouchableHighlight } from "react-native";
import AvatarCustom from "../../shared/components/Avatar";
import Icon from "react-native-vector-icons/FontAwesome5";

interface Props {
  readonly categoryData: CategoryViewModel;
}

const CategoryListItem: React.FC<Props> = (props) => {
  return (
    <View
      style={{
        margin: 5,
        padding: 10,
        backgroundColor: "white",
        alignItems: "center",
        flexDirection: "row",
        elevation: 5,
        borderRadius: 5,
      }}
    >
      <AvatarCustom photoUrl={""} />
      <View style={{ marginLeft: 10 }}>
        <Text style={{ fontSize: 18 }}>
          u/
          <Text style={{ fontWeight: "bold" }}>{props.categoryData.name}</Text>
        </Text>
        <Text style={{ fontSize: 14, fontWeight: "bold" }}>
          <Text style={{ color: "rgba(80,80,80,1)", fontWeight: "normal" }}>
            Created By{" "}
          </Text>
          s/{props.categoryData.author}
        </Text>
        <Text style={{ marginTop: 5, fontSize: 16 }}>
          {props.categoryData.description}
        </Text>
        <Text style={{ marginTop: 5, fontSize: 15 }}>
          {`Members: ${props.categoryData.memberCount}  Posts: ${props.categoryData.postCount}`}
        </Text>
      </View>
      <TouchableHighlight
        style={{ width: 30, height: 30, borderRadius: 25, marginLeft: "auto" }}
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
  );
};

export default CategoryListItem;
