import React from "react";
import { User } from "../../api/auth/AuthApiModel";
import { View, Image, Text, TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProfileStackParamList } from "../../shared/navigation/ProfileStackScreen";
import FeatherIcon from "react-native-vector-icons/Feather";

interface Props {
  readonly isSelf: boolean;
  readonly user: User;
}

const ProfileHeader: React.FC<Props> = (props) => {
  const navigation = useNavigation<
    StackNavigationProp<ProfileStackParamList, "Profile">
  >();
  return (
    <View style={{ flexDirection: "row", padding: 15 }}>
      <Image
        style={{ width: 100, height: 100 }}
        source={{
          uri: props.user.photoURL
            ? props.user.photoURL
            : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn2.iconfinder.com%2Fdata%2Ficons%2Frcons-user%2F32%2Fmale-shadow-circle-512.png&f=1&nofb=1",
        }}
      ></Image>
      <View style={{ marginLeft: 15 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}></Text>
        <Text style={{ fontSize: 16 }}>{props.user.role}</Text>
      </View>
      <View style={{ marginLeft: "auto" }}>
        <TouchableHighlight
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            navigation.navigate("EditProfile");
          }}
        >
          <FeatherIcon name={"edit"} size={30}></FeatherIcon>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default ProfileHeader;
