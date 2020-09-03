import React from "react";
import { View } from "react-native";
import {
  NotificationViewModel,
  NotificationType,
} from "../../api/notifications/NotificationsApiModel";
import NotificationList from "./NotificationList";
import { useGetNotifications } from "../../api/notifications/NotificationsApiHook";

const NotificationsScreen: React.FC = () => {
  const { result: notifications } = useGetNotifications();
  console.log(notifications);

  return (
    <View style={{ flex: 1 }}>
      <NotificationList data={notifications} />
    </View>
  );
};

export default NotificationsScreen;

const tempText = [
  'upvoted your post: your post: "Lorem ipsum dolor sit amet, consectetur adipi..."',
  'downvoted your post: "Lorem ipsum dolor sit amet, consectetur adipi..."',
  'commented on your post: "Lorem ipsum dolor sit amet, consectetur adipi..."',
  'tagged you in a post: "Lorem ipsum dolor sit amet, consectetur adipi..."',
  'upvoted your post: your post: "Lorem ipsum dolor sit amet, consectetur adipi..."',
  'downvoted your post: "Lorem ipsum dolor sit amet, consectetur adipi..."',
  'commented on your post: "Lorem ipsum dolor sit amet, consectetur adipi..."',
  'tagged you in a post: "Lorem ipsum dolor sit amet, consectetur adipi..."',
];
let tempData: NotificationViewModel[] = [];
for (let i = 0; i < 8; i++) {
  tempData.push({
    id: "",
    type: NotificationType[i],
    fromId: "",
    fromName: "Aleksandre Javakhishvili",
    fromImgUrl: "",
    toId: "",
    toName: "",
    toDeviceId: "",
    postId: "1",
    postText: "Naxet ra magari rame gavakete bichebo",
    commentId: "1",
    commentText: "Va ra magari rame gagiketebia, yochag!",
    notificationText: tempText[i],
    seen: false,
    etc: {},
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}
