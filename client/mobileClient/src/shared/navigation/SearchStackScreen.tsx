import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "../../screens/search/SearchScreen";

const SearchStack = createStackNavigator();

const SearchStackScreen: React.FC = () => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name={"Search"}
        component={SearchScreen}
        options={{ headerTitle: "Search" }}
      ></SearchStack.Screen>
    </SearchStack.Navigator>
  );
};

export default SearchStackScreen;
