import { View, StyleSheet, StatusBar } from "react-native";
import React from "react";
import { PersistAccount } from "../../shared/persist/PersistModels";
import AvatarCustom from "../../shared/components/Avatar";
import SearchBarCustom from "../../shared/components/SearchBar";
import { AppAction } from "../../shared/globalState/AppAction";

interface Props {
  account: PersistAccount;
  dispatch: React.Dispatch<AppAction>;
}
export default function HomeHeader({ account, dispatch }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <AvatarCustom
          style={styles.avatar}
          photoUrl={account && account.user && account.user.photoURL}
        />
        <SearchBarCustom
          onChangeText={(text) => {
            console.log("text", text);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    marginLeft: 10,
  },
  container: {
    backgroundColor: "#fff",
    elevation: 7,
    height: 80,
  },
  contentContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: StatusBar.currentHeight,
  },
});
