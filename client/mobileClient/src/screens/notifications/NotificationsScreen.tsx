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
for (let i = 0; i < 8; i++) {
  tempData.push({
    id: "",
    type: NotificationType[i],
    fromId: "",
    fromName: "Aleksandre Javakhishvili",
    toId: "",
    toName: "",
    toDeviceId: "",
    postId: "1",
    postText: "Naxet ra magari rame gavakete bichebo",
    commentId: "1",
    commentText: "Va ra magari rame gagiketebia, yochag!",
    notificationText: 'commented on your post: "..."',
    seen: false,
    etc: {},
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}
