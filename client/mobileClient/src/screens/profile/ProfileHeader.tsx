import React from "react";
import { User } from "../../api/auth/AuthApiModel";
import {
  View,
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProfileStackParamList } from "../../shared/navigation/ProfileStackScreen";
import FeatherIcon from "react-native-vector-icons/Feather";
import { ProfileUserViewModel } from "../../api/users/UsersApiModel";

interface Props {
  readonly isSelf: boolean;
  readonly user: ProfileUserViewModel;
  readonly onSubscriptionsPress: () => void;
}

const ProfileHeader: React.FC<Props> = (props) => {
  const navigation = useNavigation<
    StackNavigationProp<ProfileStackParamList, "Profile">
  >();
  return (
    <View style={{ padding: 15, alignItems: "center" }}>
      <Image
        style={{ width: 100, height: 100, borderRadius: 50 }}
        source={{
          uri: props.user.imgUrl
            ? props.user.imgUrl
            : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn2.iconfinder.com%2Fdata%2Ficons%2Frcons-user%2F32%2Fmale-shadow-circle-512.png&f=1&nofb=1",
        }}
      ></Image>
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontSize: 16, textAlign: "center" }}>
          {props.user.email}
        </Text>
        <Text style={{ fontSize: 16, textAlign: "center" }}>
          {props.user.role}
        </Text>
        <TouchableOpacity
          style={{ padding: 5 }}
          activeOpacity={1}
          onPress={props.onSubscriptionsPress}
        >
          <Text
            style={{ fontWeight: "bold", fontSize: 15, textAlign: "center" }}
          >
            Subscriptions: {props.user.subscribedCategories?.length || 0}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileHeader;
