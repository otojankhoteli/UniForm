import { View, StyleSheet } from "react-native";
import React from 'react'
import { Button } from "react-native-elements";
import { PersistAccount } from "../../shared/persist/PersistModels";
import AvatarCustom from "../../shared/components/Avatar";
import SearchBarCustom from "../../shared/components/SearchBar";
import { AppAction } from "../../shared/globalState/AppAction";
import { useGlobalState } from "../../shared/globalState/AppContext";
import { navigate } from "../../shared/navigation/RootNavigation";

interface Props {
  account: PersistAccount,
  dispatch: React.Dispatch<AppAction>
}
export default function HomeHeader({ account, dispatch }: Props) {

  const logout = () => {
    dispatch({
      type: "setLoggedInUser",
      account: null
    });
    navigate("Login");
  }

  return <View style={styles.container}>
    <AvatarCustom style={styles.avatar} photoUrl={account && account.user && account.user.photoURL} />
    <SearchBarCustom onChangeText={(text) => { console.log("text", text) }} />
    <Button title="Logout" onPress={logout} />
  </View>
}

const styles = StyleSheet.create({
  avatar: {
    marginLeft: 10,
  },
  container: {
    alignItems: "center",
    backgroundColor: '#fff',
    display: "flex",
    elevation: 10,
    flexDirection: "row",
    height: 70,
    justifyContent: "center",
    marginTop: 50
  },
});