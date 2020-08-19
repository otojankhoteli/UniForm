import React from "react";
import { View } from "react-native";
import {
  NotificationViewModel,
  NotificationType,
} from "../../api/notifications/NotificationsApiModel";
import NotificationList from "./NotificationList";

const NotificationsScreen: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <NotificationList data={tempData} />
    </View>
  );
};

export default NotificationsScreen;

let tempData: NotificationViewModel[] = [];
for (let i = 0; i < 17; i++) {
  tempData.push({
    fromId: "",
    fromName: "ako" + i,
    fromProfilePictureUri: "",
    id: i.toString(),
    text:
      "did something to your something.did something to your something.did something to your something.did something to your something.did something to your something.did something to your something.did something to your something.did something to your something.did something to your something.did something to your something.",
    type: NotificationType.Post,
    whereId: "",
  });
}
