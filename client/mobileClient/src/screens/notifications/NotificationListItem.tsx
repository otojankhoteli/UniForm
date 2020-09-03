import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import AvatarCustom from "../../shared/components/Avatar";
import { NotificationViewModel } from "../../api/notifications/NotificationsApiModel";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList } from "../../shared/navigation/HomeStackScreen";
import { NotificationsStackParamList } from "../../shared/navigation/NotificationsStackScreen";

interface Props {
  readonly data: NotificationViewModel;
}

const NotificationListItem: React.FC<Props> = (props) => {
  const navigation = useNavigation<
    StackNavigationProp<NotificationsStackParamList, "Notifications">
  >();

  return (
    <TouchableOpacity
      style={{
        backgroundColor:
          parseInt(props.data.id) % 2 === 1 ? "white" : "rgb(240,240,240)",
      }}
      activeOpacity={1}
      onPress={() => {
        navigation.push("Post", { postId: props.data.postId });
      }}
    >
      <View
        style={{
          flexDirection: "row",
          padding: 10,
        }}
      >
        {/*TODO*/}
        <Image
          style={{ width: 40, height: 40, borderRadius: 20 }}
          source={{
            uri:
              props.data.fromImgUrl ||
              "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.askmen.com%2F1080x540%2F2016%2F01%2F25-021526-facebook_profile_picture_affects_chances_of_getting_hired.jpg&f=1&nofb=1",
          }}
        />
        <View style={{ marginRight: 40 }}>
          <Text
            style={{
              fontSize: 16,
              marginLeft: 10,
              marginRight: 10,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>{props.data.fromName}</Text>{" "}
            {props.data.notificationText}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationListItem;
