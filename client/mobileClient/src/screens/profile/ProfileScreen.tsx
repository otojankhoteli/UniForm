import React from "react";
import { View, Image, Text } from "react-native";
import { useGlobalState } from "../../shared/globalState/AppContext";
import { Button } from "react-native-elements";

const ProfileScreen: React.FC = () => {
  const [{ account }, dispatch] = useGlobalState();

  const logout = () => {
    dispatch({
      type: "setLoggedInUser",
      account: null,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", padding: 15 }}>
        <Image
          style={{ width: 100, height: 100 }}
          source={{
            uri:
              account && account.user && account.user.photoURL
                ? account.user.photoURL
                : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn2.iconfinder.com%2Fdata%2Ficons%2Frcons-user%2F32%2Fmale-shadow-circle-512.png&f=1&nofb=1",
          }}
        ></Image>
        <View style={{ marginLeft: 15 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>
            {account && account.user && account.user.firstName
              ? `${account.user.firstName} ${account.user.lastName}`
              : "Tornike Bubuteishvili"}
          </Text>
          <Text style={{ fontSize: 16 }}>
            {account && account.user ? account.user.role : "Student"}
          </Text>
        </View>
      </View>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

export default ProfileScreen;
