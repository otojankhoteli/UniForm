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
import { useFeed, useMockFeed } from "../../api/posts/PostsApiHook";
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
      <HomeHeader dispatch={dispatch} account={account} />
      <PostList
        isLoading={isLoading}
        posts={result || tempPostData}
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

const tempPostData: PostViewModel[] = [
  {
    id: "1",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    authorId: "5f1c90ca2fe410a227a969f7",
    authorUsername: "ako",
    authorProfilePic: "",
    voteCount: 0,
    categoryName: "MACS",
    categoryId: "5f1ca0e1038af74494cbeda4",
    isJoined: false,
    isUpvoted: false,
    isDownvoted: false,
    createdAt: "2020-07-25T21:27:43.160Z",
    files: ["string"],
  },
  {
    id: "2",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    authorId: "5f1c90ca2fe410a227a969f7",
    authorUsername: "ako",
    authorProfilePic: "",
    voteCount: 0,
    categoryName: "MACS",
    categoryId: "5f1ca0e1038af74494cbeda4",
    isJoined: false,
    isUpvoted: false,
    isDownvoted: false,
    createdAt: "2020-07-25T21:27:43.160Z",
    files: ["string"],
  },
  {
    id: "3",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    authorId: "5f1c90ca2fe410a227a969f7",
    authorUsername: "ako",
    authorProfilePic: "",
    voteCount: 0,
    categoryName: "MACS",
    categoryId: "5f1ca0e1038af74494cbeda4",
    isJoined: false,
    isUpvoted: false,
    isDownvoted: false,
    createdAt: "2020-07-25T21:27:43.160Z",
    files: ["string"],
  },
  {
    id: "4",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    authorId: "5f1c90ca2fe410a227a969f7",
    authorUsername: "ako",
    authorProfilePic: "",
    voteCount: 0,
    categoryName: "MACS",
    categoryId: "5f1ca0e1038af74494cbeda4",
    isJoined: false,
    isUpvoted: false,
    isDownvoted: false,
    createdAt: "2020-07-25T21:27:43.160Z",
    files: ["string"],
  },
  {
    id: "11",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    authorId: "5f1c90ca2fe410a227a969f7",
    authorUsername: "ako",
    authorProfilePic: "",
    voteCount: 0,
    categoryName: "MACS",
    categoryId: "5f1ca0e1038af74494cbeda4",
    isJoined: false,
    isUpvoted: false,
    isDownvoted: false,
    createdAt: "2020-07-25T21:27:43.160Z",
    files: ["string"],
  },
  {
    id: "12",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    authorId: "5f1c90ca2fe410a227a969f7",
    authorUsername: "ako",
    authorProfilePic: "",
    voteCount: 0,
    categoryName: "MACS",
    categoryId: "5f1ca0e1038af74494cbeda4",
    isJoined: false,
    isUpvoted: false,
    isDownvoted: false,
    createdAt: "2020-07-25T21:27:43.160Z",
    files: ["string"],
  },
  {
    id: "123",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    authorId: "5f1c90ca2fe410a227a969f7",
    authorUsername: "ako",
    authorProfilePic: "",
    voteCount: 0,
    categoryName: "MACS",
    categoryId: "5f1ca0e1038af74494cbeda4",
    isJoined: false,
    isUpvoted: false,
    isDownvoted: false,
    createdAt: "2020-07-25T21:27:43.160Z",
    files: ["string"],
  },
  {
    id: "14",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    authorId: "5f1c90ca2fe410a227a969f7",
    authorUsername: "ako",
    authorProfilePic: "",
    voteCount: 0,
    categoryName: "MACS",
    categoryId: "5f1ca0e1038af74494cbeda4",
    isJoined: false,
    isUpvoted: false,
    isDownvoted: false,
    createdAt: "2020-07-25T21:27:43.160Z",
    files: ["string"],
  },
  {
    id: "23",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    authorId: "5f1c90ca2fe410a227a969f7",
    authorUsername: "ako",
    authorProfilePic: "",
    voteCount: 0,
    categoryName: "MACS",
    categoryId: "5f1ca0e1038af74494cbeda4",
    isJoined: false,
    isUpvoted: false,
    isDownvoted: false,
    createdAt: "2020-07-25T21:27:43.160Z",
    files: ["string"],
  },
  {
    id: "21",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    authorId: "5f1c90ca2fe410a227a969f7",
    authorUsername: "ako",
    authorProfilePic: "",
    voteCount: 0,
    categoryName: "MACS",
    categoryId: "5f1ca0e1038af74494cbeda4",
    isJoined: false,
    isUpvoted: false,
    isDownvoted: false,
    createdAt: "2020-07-25T21:27:43.160Z",
    files: ["string"],
  },
  {
    id: "22",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    authorId: "5f1c90ca2fe410a227a969f7",
    authorUsername: "ako",
    authorProfilePic: "",
    voteCount: 0,
    categoryName: "MACS",
    categoryId: "5f1ca0e1038af74494cbeda4",
    isJoined: false,
    isUpvoted: false,
    isDownvoted: false,
    createdAt: "2020-07-25T21:27:43.160Z",
    files: ["string"],
  },
  {
    id: "24",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    authorId: "5f1c90ca2fe410a227a969f7",
    authorUsername: "ako",
    authorProfilePic: "",
    voteCount: 0,
    categoryName: "MACS",
    categoryId: "5f1ca0e1038af74494cbeda4",
    isJoined: false,
    isUpvoted: false,
    isDownvoted: false,
    createdAt: "2020-07-25T21:27:43.160Z",
    files: ["string"],
  },
  {
    id: "32",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    authorId: "5f1c90ca2fe410a227a969f7",
    authorUsername: "ako",
    authorProfilePic: "",
    voteCount: 0,
    categoryName: "MACS",
    categoryId: "5f1ca0e1038af74494cbeda4",
    isJoined: false,
    isUpvoted: false,
    isDownvoted: false,
    createdAt: "2020-07-25T21:27:43.160Z",
    files: ["string"],
  },
  {
    id: "31",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    authorId: "5f1c90ca2fe410a227a969f7",
    authorUsername: "ako",
    authorProfilePic: "",
    voteCount: 0,
    categoryName: "MACS",
    categoryId: "5f1ca0e1038af74494cbeda4",
    isJoined: false,
    isUpvoted: false,
    isDownvoted: false,
    createdAt: "2020-07-25T21:27:43.160Z",
    files: ["string"],
  },
  {
    id: "34",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    authorId: "5f1c90ca2fe410a227a969f7",
    authorUsername: "ako",
    authorProfilePic: "",
    voteCount: 0,
    categoryName: "MACS",
    categoryId: "5f1ca0e1038af74494cbeda4",
    isJoined: false,
    isUpvoted: false,
    isDownvoted: false,
    createdAt: "2020-07-25T21:27:43.160Z",
    files: ["string"],
  },
  {
    id: "324",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    authorId: "5f1c90ca2fe410a227a969f7",
    authorUsername: "ako",
    authorProfilePic: "",
    voteCount: 0,
    categoryName: "MACS",
    categoryId: "5f1ca0e1038af74494cbeda4",
    isJoined: false,
    isUpvoted: false,
    isDownvoted: false,
    createdAt: "2020-07-25T21:27:43.160Z",
    files: ["string"],
  },
  {
    id: "321",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    authorId: "5f1c90ca2fe410a227a969f7",
    authorUsername: "ako",
    authorProfilePic: "",
    voteCount: 0,
    categoryName: "MACS",
    categoryId: "5f1ca0e1038af74494cbeda4",
    isJoined: false,
    isUpvoted: false,
    isDownvoted: false,
    createdAt: "2020-07-25T21:27:43.160Z",
    files: ["string"],
  },
];
