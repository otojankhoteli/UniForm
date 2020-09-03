import React, { useEffect } from "react";
import { StyleSheet, View, Button, ScrollView } from "react-native";
import { Text } from "react-native-elements";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import FloatingButton from "../../shared/components/FloatingButton";
import { useGlobalState } from "../../shared/globalState/AppContext";
import useToast from "../../shared/toast/ToastHooks";
import HomeHeader from "./HomeHeader";
import { PostList } from "./feed/PostList";
import { useFeed } from "../../api/posts/PostsApiHook";
import { MainColor } from "../../shared/Const";
import { HomeStackParamList } from "../../shared/navigation/HomeStackScreen";
import { PostViewModel } from "../../api/posts/PostsApiModel";

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, "Home">;
type HomeScreenRouteProp = RouteProp<HomeStackParamList, "Home">;

export default function HomeScreen() {
  const {
    isLoading,
    fetchFirstPage,
    fetchNextPage,
    fetchPrevPage,
    result,
  } = useFeed();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const route = useRoute<HomeScreenRouteProp>();

  const [{ account }, dispatch] = useGlobalState();

  useToast();
  // const route = useRoute<HomeScreenRouteProp>();

  useEffect(() => {
    fetchFirstPage();
  }, [route]);

  const onAddClick = () => {
    navigation.navigate("AddPost");
  };

  return (
    <View style={styles.container}>
      <PostList
        isLoading={isLoading}
        posts={result || []}
        onRefresh={fetchFirstPage}
        fetchNextPage={fetchNextPage}
        fetchPrevPage={fetchPrevPage}
      />
      <FloatingButton
        onPress={onAddClick}
        color={"rgba(64,128,255,1)"}
        type={"add"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  text: {
    color: MainColor,
    fontSize: 21,
    fontWeight: "bold",
    marginRight: 5,
  },
  textContainer: {
    alignItems: "center",
    height: 100,
    justifyContent: "center",
    width: "100%",
  },
});
