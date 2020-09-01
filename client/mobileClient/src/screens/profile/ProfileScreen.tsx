import React, { useState, useEffect, useMemo } from "react";
import { View, Image, Text } from "react-native";
import { useGlobalState } from "../../shared/globalState/AppContext";
import { Button } from "react-native-elements";
import PostList from "../../shared/components/postList/PostList";
import { PostViewModel } from "../../api/posts/PostsApiModel";
import ProfileHeader from "./ProfileHeader";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { HomeStackParamList } from "../../shared/navigation/HomeStackScreen";
import { ProfileStackParamList } from "../../shared/navigation/ProfileStackScreen";
import { SearchStackParamList } from "../../shared/navigation/SearchStackScreen";
import { NotificationsStackParamList } from "../../shared/navigation/NotificationsStackScreen";
import { User } from "../../api/auth/AuthApiModel";
import { UserViewModel } from "../../api/users/UsersApiModel";

const ProfileScreen: React.FC = () => {
  const [{ account }, dispatch] = useGlobalState();
  const [user, setUser] = useState<UserViewModel>({
    id: "1",
    email: "tbubu14@freeuni.edu.ge",
    role: "student",
    name: "Tornike",
    surname: "Bubuteishvili",
    photoURL: null,
  });
  const [profilePosts, setProfilePosts] = useState<PostViewModel[]>([]);

  const route = useRoute<
    RouteProp<
      | HomeStackParamList
      | ProfileStackParamList
      | SearchStackParamList
      | NotificationsStackParamList,
      "Profile"
    >
  >();
  const navigation = useNavigation();

  const isSelf = useMemo(() => {
    if (!route.params || !route.params.userId) return true;
    if (account && account.user && account.user.id)
      return account.user.id == route.params.userId;
    return true;
  }, []);

  useEffect(() => {
    if (user.name) {
      navigation.setOptions({
        headerTitle: user.name + " " + user.surname,
      });
    }
  });

  useEffect(() => {
    if (isSelf) {
      navigation.setOptions({
        headerRight: () => {
          return (
            <Text
              style={{
                color: "rgb(255,64,128)",
                fontSize: 16,
                fontWeight: "bold",
                marginRight: 15,
              }}
              onPress={() => {
                alert("log out"); //TODO
                logout();
              }}
            >
              Log Out
            </Text>
          );
        },
      });
    }
  }, []);

  useEffect(() => {
    //TODO actually fetch user
    if (isSelf && account && account.user) setUser(account.user);
  }, []);

  useEffect(() => {
    //TODO actually fetch posts
    let tempPosts: PostViewModel[] = [];
    for (let i = 0; i < 10; i++) {
      tempPosts.push({
        id: "1",
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        authorId: "5f1c90ca2fe410a227a969f7",
        authorUsername: "tbubu14",
        authorProfilePic: "",
        voteCount: 0,
        categoryName: "MACS",
        categoryId: "5f1ca0e1038af74494cbeda4",
        isJoined: false,
        isUpvoted: false,
        isDownvoted: false,
        createdAt: "2020-07-25T21:27:43.160Z",
        files: ["string"],
      });
    }
    setProfilePosts(tempPosts);
  }, []);

  const logout = () => {
    dispatch({
      type: "setLoggedInUser",
      account: null,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <PostList
        posts={profilePosts}
        header={<ProfileHeader isSelf={isSelf} user={user} />}
      />
    </View>
  );
};

export default ProfileScreen;
