import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AddPostScreen from "../../screens/addPost/AddPostScreen";
import ChooseCategoryScreen from "../../screens/chooseCategory/ChooseCategoryScreen";
import HomeScreen from "../../screens/home/HomeScreen";
import { CategoryViewModel } from "../../api/categories/CategoriesApiModel";
import PostScreen from "../../screens/post/PostScreen";
import { PostViewModel } from "../../api/posts/PostsApiModel";
import ProfileScreen from "../../screens/profile/ProfileScreen";
import { TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Feather";

export type HomeStackParamList = {
  Home: undefined;
  AddPost: { category: CategoryViewModel };
  ChooseCategory: undefined;
  Feed: { sort: "latest" | "top" } | undefined;
  Post: { post: PostViewModel };
  Profile: { userId: string };
};

const HomeStack = createStackNavigator<HomeStackParamList>();

const HomeStackScreen: React.FC = () => {
  const navigation = useNavigation<DrawerNavigationProp<{}>>();
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name={"Home"}
        component={HomeScreen}
        options={{
          headerTitle: "UniForm",
          headerTitleAlign: "center",
          headerLeft: (props) => {
            return (
              <TouchableHighlight
                style={{
                  width: 40,
                  height: 40,
                  marginLeft: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                underlayColor={"rgba(0,0,0,0)"}
                onPress={() => {
                  navigation.openDrawer();
                }}
              >
                <Icon name={"menu"} size={24}></Icon>
              </TouchableHighlight>
            );
          },
        }}
      ></HomeStack.Screen>
      <HomeStack.Screen
        name="AddPost"
        component={AddPostScreen}
        options={{ headerTitle: "Add Post" }}
      />
      <HomeStack.Screen
        name="ChooseCategory"
        component={ChooseCategoryScreen}
        options={{ headerTitle: "Choose Category" }}
      />
      <HomeStack.Screen
        name="Post"
        component={PostScreen}
        options={{ headerTitle: "Post" }}
      />
      <HomeStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerTitle: "Profile" }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
