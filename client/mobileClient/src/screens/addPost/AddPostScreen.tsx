import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { Button, Icon, } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { PostText, TextStateChange } from "./PostText";
import { UserTag } from "./UserTagSuggestionPopUp";
import HorizontalLine from "../../shared/components/HorizontalLine";
import ChooseCategoryPanel from "./ChooseCategoryPanel";
import { RootStackParamList } from "../StartUpScreen";
import { CategoryViewModel } from "../../api/categories/CategoriesApiModel";
import { usePostCreate } from "../../api/posts/PostsApiHook";
import { useHashtagByName } from "../../api/hashtags/HashtagsApiHook";
import { HashtagViewModel } from "../../api/hashtags/HashtagsApiModel";
import { useUsersByEmail } from "../../api/users/UsersApiHook";
import MediaSection, { UploadedImage } from "./MediaSection";

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
  uploadedContentsId: string[];
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
    uploadedContentsId: [],
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
    fetchTags(prev => ({
      wait: false,
      info: {
        ...prev.info,
        queryParams: [{ key: "name", value: searchText }]
      }
    }));
  }

  const onUserTagChange = (searchText: string) => {
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

  const onUploadedContentsChange = (photos: UploadedImage[]) => {
    setSubmitState(prev => ({
      ...prev,
      uploadedContentsId: photos.map(p => p.fileId)
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
        <MediaSection onUploadedContentsChange={onUploadedContentsChange} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  chooseCategoryPanel: {
    marginBottom: 10
  },
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5
  },
});
