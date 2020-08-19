import React from "react";
import { NotificationViewModel } from "../../api/notifications/NotificationsApiModel";
import { FlatList } from "react-native";
import NotificationListItem from "./NotificationListItem";

interface Props {
  readonly data: NotificationViewModel[];
}

const NotificationList: React.FC<Props> = (props) => {
  return (
    <FlatList
      keyExtractor={(_, index) => {
        return index.toString();
      }}
      data={props.data}
      renderItem={(item) => {
        return <NotificationListItem data={item.item}></NotificationListItem>;
      }}
    ></FlatList>
  );
};

export default NotificationList;
