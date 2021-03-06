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
import { useUserPosts } from "../../api/posts/PostsApiHook";
import { useGetUserById } from "../../api/users/UsersApiHook";
import SubscribedModal from "./SubscribedModal";

const ProfileScreen: React.FC = () => {
  const [{ account }, dispatch] = useGlobalState();
  // const [user, setUser] = useState<UserViewModel>({
  //   _id: "1",
  //   email: "tbubu14@freeuni.edu.ge",
  //   role: "student",
  //   name: "Tornike",
  //   surname: "Bubuteishvili",
  //   photoURL: null,
  // });

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

  const [subscribedModalVisible, setSubscribedModalVisible] = useState(false);

  const userId = useMemo(() => {
    if (!route.params || !route.params.userId) {
      if (account && account.user && account.user._id) {
        return account.user._id;
      } else return "";
    }
    return route.params.userId;
  }, []);
  const { result: user } = useGetUserById(userId);
  const { result: posts, refetch } = useUserPosts(userId);

  const isSelf = useMemo(() => {
    if (!route.params || !route.params.userId) return true;
    if (account && account.user && account.user._id) {
      console.log("have account", account.user._id);
      return account.user._id == route.params.userId;
    }
    return true;
  }, []);

  useEffect(() => {
    if (user && user.name) {
      navigation.setOptions({
        headerTitle: user.name,
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
    // if (isSelf && account && account.user) setUser(account.user);
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
        posts={posts || []}
        header={
          <ProfileHeader
            isSelf={isSelf}
            user={
              user || {
                _id: "",
                deviceId: "",
                email: "",
                imgUrl: "",
                name: "",
                role: "",
                subscribedCategories: [],
                voteCount: 0,
              }
            }
            onSubscriptionsPress={() => {
              setSubscribedModalVisible(true);
            }}
          />
        }
      />
      <SubscribedModal
        visible={subscribedModalVisible}
        setVisible={setSubscribedModalVisible}
        userId={userId}
      />
    </View>
  );
};

export default ProfileScreen;
