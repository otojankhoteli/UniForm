import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AvatarCustom from "../../shared/components/Avatar";
import { NotificationViewModel } from "../../api/notifications/NotificationsApiModel";

interface Props {
  readonly data: NotificationViewModel;
}

const NotificationListItem: React.FC<Props> = (props) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor:
          parseInt(props.data.id) % 2 === 1 ? "white" : "rgb(240,240,240)",
      }}
      activeOpacity={1}
      onPress={() => {
        alert("notification " + props.data.id);
      }}
    >
      <View
        style={{
          flexDirection: "row",
          padding: 10,
        }}
      >
        <AvatarCustom photoUrl={props.data.fromProfilePictureUri} />
        <View style={{ marginRight: 40 }}>
          <Text
            style={{
              fontSize: 16,
              marginLeft: 10,
              marginRight: 10,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>{props.data.fromName}</Text>{" "}
            {props.data.text}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationListItem;
