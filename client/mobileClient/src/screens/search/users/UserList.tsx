import React, { useMemo } from "react";
import { FlatList, ActivityIndicator } from "react-native";
import { UserViewModel } from "../../../api/users/UsersApiModel";
import UserListItem from "./UserListItem";

interface Props {
  readonly searchTerm: string;
  readonly visible: boolean;
}

const UserList: React.FC<Props> = (props) => {
  const tempData = useMemo(() => {
    let data: UserViewModel[] = [];
    for (let i = 0; i < 10; i++) {
      data.push({
        id: "" + i,
        email: `ako${i}@gmail.com`,
        name: "Aleksandre" + i,
        surname: "Javakhishvili",
        photoURL: "",
        role: "student",
      });
    }
    return data;
  }, []);

  if (!props.visible)
    return <ActivityIndicator style={{ marginTop: 20 }} size="large" />;

  return (
    <FlatList
      style={{ flex: 1 }}
      data={tempData}
      keyExtractor={(_, index) => {
        return index.toString();
      }}
      renderItem={({ item }) => {
        return <UserListItem user={item} />;
      }}
    ></FlatList>
  );
};

export default UserList;
