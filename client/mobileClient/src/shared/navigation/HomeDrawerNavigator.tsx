import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeStackScreen from "./HomeStackScreen";
import SettingsScreen from "../../screens/settings/SettingsScreen";
import { View, Text, Image, StatusBar, TouchableHighlight } from "react-native";
import { useGlobalState } from "../globalState/AppContext";
import { Button } from "react-native-elements";

const Drawer = createDrawerNavigator();

const HomeDrawerNavigator: React.FC = () => {
  const [{ account }, dispatch] = useGlobalState();
  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        const photoUrl =
          account && account.user && account.user.photoURL
            ? account.user.photoURL
            : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.askmen.com%2F1080x540%2F2016%2F01%2F25-021526-facebook_profile_picture_affects_chances_of_getting_hired.jpg&f=1&nofb=1";
        const username =
          account && account.user && account.user.name
            ? account.user.name + " " + account.user.surname
            : "Tornike Bubuteishvili";
        const email =
          account && account.user && account.user.email
            ? account.user.email
            : "tbubu14@freeuni.edu.ge";
        return (
          <View style={props.style}>
            <View
              style={{
                flex: 1,
                marginTop:
                  (StatusBar.currentHeight ? StatusBar.currentHeight : 24) + 15,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  height: 30,
                  width: "100%",
                  marginBottom: 15,
                  marginLeft: 30,
                }}
              >
                <Image
                  source={{
                    uri: photoUrl,
                  }}
                  style={{ width: 40, height: 40, borderRadius: 25 }}
                ></Image>
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      marginLeft: 5,
                    }}
                  >
                    {username}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      marginLeft: 5,
                    }}
                  >
                    {email}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  height: 0.5,
                  width: "100%",
                  backgroundColor: "rgba(100,100,100,0.4)",
                  marginVertical: 10,
                }}
              ></View>
              <DrawerButton
                onPress={() => {
                  props.navigation.navigate("HomeStack");
                }}
                title={"Home"}
              ></DrawerButton>
              <DrawerButton
                onPress={() => {
                  props.navigation.navigate("ProfileStack");
                }}
                title={"My Profile"}
              ></DrawerButton>
              <DrawerButton
                onPress={() => {
                  props.navigation.navigate("Settings");
                }}
                title={"Settings"}
              ></DrawerButton>
              <DrawerButton
                onPress={() => {
                  dispatch({
                    type: "setLoggedInUser",
                    account: null,
                  });
                }}
                title={"Log Out"}
                color={"rgb(220,70,50)"}
              ></DrawerButton>
            </View>
          </View>
        );
      }}
    >
      <Drawer.Screen
        name={"HomeStack"}
        component={HomeStackScreen}
      ></Drawer.Screen>
      <Drawer.Screen
        name={"Settings"}
        component={SettingsScreen}
        options={{ unmountOnBlur: true, title: "Settings" }}
      ></Drawer.Screen>
    </Drawer.Navigator>
  );
};

const DrawerButton: React.FC<{
  onPress: () => void;
  title: string;
  color?: string;
}> = (props) => {
  return (
    <TouchableHighlight
      style={{
        height: 50,
        width: "95%",
        justifyContent: "center",
        borderRadius: 5,
      }}
      underlayColor={"rgba(0,0,0,0.15)"}
      onPress={props.onPress}
    >
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 16,
          marginLeft: 15,
          color: props.color || "rgb(80,150,255)",
        }}
      >
        {props.title}
      </Text>
    </TouchableHighlight>
  );
};

export default HomeDrawerNavigator;
