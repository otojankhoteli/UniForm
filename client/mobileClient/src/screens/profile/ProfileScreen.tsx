import React from "react";
import { View } from "react-native";
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
    <View style={{ flex: 1, backgroundColor: "rgba(255, 128, 64, 1)" }}>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

export default ProfileScreen;
