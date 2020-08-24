import React from "react";
import { UserViewModel } from "../../../api/users/UsersApiModel";
import { View, Image, TouchableHighlight, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { SearchStackParamList } from "../../../shared/navigation/SearchStackScreen";

interface Props {
  readonly user: UserViewModel;
}

const UserListItem: React.FC<Props> = (props) => {
  const navigation = useNavigation<
    StackNavigationProp<SearchStackParamList, "Search">
  >();
  return (
    <TouchableHighlight
      style={{
        margin: 5,
        padding: 10,
        borderRadius: 5,
        backgroundColor: "white",
        elevation: 5,
      }}
      underlayColor={"rgba(0,0,0,0.1)"}
      onPress={() => {
        navigation.push("Profile", { userId: props.user.id });
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          style={{ width: 40, height: 40, borderRadius: 20 }}
          source={{
            uri:
              props.user.photoURL ||
              "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.askmen.com%2F1080x540%2F2016%2F01%2F25-021526-facebook_profile_picture_affects_chances_of_getting_hired.jpg&f=1&nofb=1",
          }}
        ></Image>
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {props.user.name} {props.user.surname}
          </Text>
          <Text style={{ fontSize: 15, color: "rgb(100,100,100)" }}>
            {props.user.email}
          </Text>
          <Text style={{ fontSize: 15, color: "rgb(100,100,100)" }}>
            {props.user.role}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default UserListItem;
