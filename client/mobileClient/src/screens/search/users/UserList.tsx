import React, { useMemo, useEffect } from "react";
import { FlatList, ActivityIndicator } from "react-native";
import { UserViewModel } from "../../../api/users/UsersApiModel";
import UserListItem from "./UserListItem";
import { useUsersByEmail } from "../../../api/users/UsersApiHook";

interface Props {
  readonly searchTerm: string;
  readonly visible: boolean;
}

const UserList: React.FC<Props> = (props) => {
  const {
    result: users,
    setRequestInfo,
    fetchNextPage,
    fetchPrevPage,
    refetch,
    error,
    isError,
    isLoading,
  } = useUsersByEmail();
  console.log(users);

  useEffect(() => {
    if (props.visible) {
      setRequestInfo({
        wait: false,
        info: {
          limit: 10,
          queryParams:
            props.searchTerm != ""
              ? [{ key: "name", value: props.searchTerm }]
              : [],
          skip: 0,
        },
      });
    }
  }, [props.searchTerm, props.visible]);

  const tempData = useMemo(() => {
    let data: UserViewModel[] = [];
    for (let i = 0; i < 10; i++) {
      data.push({
        _id: "" + i,
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
      data={users}
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
