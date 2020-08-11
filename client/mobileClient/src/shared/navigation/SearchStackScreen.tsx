import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "../../screens/search/SearchScreen";
import AddCategoryScreen from "../../screens/addCategory/AddCategoryScreen";

const SearchStack = createStackNavigator();

const SearchStackScreen: React.FC = () => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name={"Search"}
        component={SearchScreen}
        options={{ headerTitle: "Categories" }}
      ></SearchStack.Screen>
      <SearchStack.Screen
        name={"AddCategory"}
        component={AddCategoryScreen}
        options={{ headerTitle: "Add Category" }}
      ></SearchStack.Screen>
    </SearchStack.Navigator>
  );
};

export default SearchStackScreen;
