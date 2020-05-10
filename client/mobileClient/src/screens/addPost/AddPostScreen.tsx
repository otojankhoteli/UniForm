import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { Button, Icon, } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { PostText, TextStateChange } from "./PostText";
import HashTags from "./HashTags";
import { UserTag } from "./UserTagSuggestionPopUp";
import { PostHashTag } from "./HashTagSuggestionPopUp";
import HorizontalLine from "../../shared/components/HorizontalLine";
import ChooseCategoryPanel from "./ChooseCategoryPanel";
import { RootStackParamList } from "../StartUpScreen";
import { CategoryViewModel } from "../../api/categories/CategoriesApiModel";
import { usePostCreate } from "../../api/posts/PostsApiHook";
import { useHashtagByName } from "../../api/hashtags/HashtagsApiHook";
import { HashtagViewModel } from "../../api/hashtags/HashtagsApiModel";
import { useUsersByEmail } from "../../api/users/UsersApiHook";

type AddPostScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddPost'
>;
type AddPostScreenRouteProp = RouteProp<RootStackParamList, 'AddPost'>;
interface SubmitState {
  isValid: boolean;
  text: string;
  hashTags: string[];
  userTags: string[];
  category: CategoryViewModel;
}
const initialUserTags: UserTag[] = [{ userId: "test1", username: "ako" }, { userId: "test2", username: "bubuta" }, { userId: "test3", username: "janxeqsa" }];
const initialPostTags: HashtagViewModel[] = [{ name: "uni", }, { name: "macs", }, { name: "sagamocdo", }];
export default function AddPostScreen() {
  const { post } = usePostCreate();
  // const [userTags, setUserTags] = useState<UserTag[]>(initialUserTags);
  // const [postTags, setPostTags] = useState<HashtagViewModel[]>(initialPostTags);
  const { result: hashTags, setRequestInfo: fetchTags } = useHashtagByName();
  const { result: userTags, setRequestInfo: fetchUserTags } = useUsersByEmail();

  const [submitState, setSubmitState] = useState<SubmitState>({
    category: undefined,
    isValid: false,
    hashTags: [],
    userTags: [],
    text: ""
  })
  const navigation = useNavigation<AddPostScreenNavigationProp>();
  const route = useRoute<AddPostScreenRouteProp>()

  const onSubmit = useCallback(() => {
    if (submitState.isValid) {
      post({
        categoryId: submitState.category.id,
        text: submitState.text,
        hashTags: submitState.hashTags,
        userTags: submitState.userTags
      })
    }
  }, [submitState]);

  const isValidState = useCallback((text: string, category: CategoryViewModel) => {
    return text.length > 0 && category !== undefined && category !== null;
  }, [])

  useEffect(() => {
    if (route && route.params && route.params.category) {
      setSubmitState(prev => ({ ...prev, category: route.params.category, isValid: isValidState(prev.text, route.params.category) }));
    }
  }, [route])

  const onHashTagChange = (searchText: string) => {
    // const filtered = initialPostTags.filter(tag => tag.name.indexOf(searchText) !== -1);
    // setPostTags(filtered);
    console.log("searchText", searchText)
    fetchTags(prev => ({
      wait: false,
      info: {
        ...prev.info,
        queryParams: [{ key: "name", value: searchText }]
      }
    }));
  }

  const onUserTagChange = (searchText: string) => {
    // const filtered = initialUserTags.filter(tag => tag.username.indexOf(searchText) !== -1);
    // setUserTags(filtered);
    console.log("searchText", searchText)
    fetchUserTags(prev => ({
      wait: false,
      info: {
        ...prev.info,
        queryParams: [{ key: "name", value: searchText }]
      }
    }));
  }

  const navigateToChooseCategory = () => {
    navigation.navigate("ChooseCategory");
  }

  const onTextChange = (textStateChange: TextStateChange) => {
    const hashTags = textStateChange.textNodes.filter(node => node.type === "#").map(node => node.value.split("#")[1]);
    const userTags = textStateChange.textNodes.filter(node => node.type === "@").map(node => node.value.split("@")[1]);
    setSubmitState(prev => ({
      ...prev, text: textStateChange.text,
      hashTags, userTags,
      isValid: isValidState(textStateChange.text, prev.category)
    }))
  }

  React.useLayoutEffect(() => {
    if (!navigation)
      return;
    navigation.setOptions({
      headerRight: () => (
        <Icon containerStyle={{ marginRight: 5 }}
          disabledStyle={{ backgroundColor: "white" }}
          disabled={!submitState.isValid} onPress={onSubmit}
          type="font-awesome" name="check" color={submitState.isValid ? "green" : "gray"} />
      ),
    });
  }, [navigation, submitState]);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, }}>
        <ScrollView keyboardShouldPersistTaps="handled" style={{ flex: 1, }}>
          <ChooseCategoryPanel chosenCategory={submitState.category} style={styles.chooseCategoryPanel} onClick={navigateToChooseCategory} />
          <HorizontalLine mode="fill" />
          <PostText
            onHashTagChange={onHashTagChange} onUserTagChange={onUserTagChange}
            onTextChange={onTextChange}
            placeHolder="Your post text"
            hashTags={hashTags || []} userTags={userTags || []} />
        </ScrollView>
      </View>

      <View style={styles.cameraButtonsContainer}>
        <Icon
          name="camera"
          type="font-awesome"
          color="gray"
          size={50}
          onPress={() => { console.log("on camera click") }}
          containerStyle={styles.cameraButtonIcon}
        />
        <Icon
          name="image"
          type="font-awesome"
          color="gray"
          size={50}
          onPress={() => { console.log("on video click") }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  cameraButtonIcon: { marginRight: 10 },
  cameraButtonsContainer: {
    alignItems: "center",
    bottom: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5, position: "absolute", width: "100%"
  },
  chooseCategoryPanel: {
    marginBottom: 10
  },
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5
  },
  // submitButtonSubContainer: { alignItems: "center", backgroundColor: 'rgba(250, 256, 256, 1)', borderRadius: 50, elevation: 10, height: 60, justifyContent: "center", width: 100 }
});
