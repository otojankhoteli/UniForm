import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { Button, Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { PostText, TextStateChange } from "./PostText";
import { UserTag } from "./UserTagSuggestionPopUp";
import HorizontalLine from "../../shared/components/HorizontalLine";
import ChooseCategoryPanel from "./ChooseCategoryPanel";
import { CategoryViewModel } from "../../api/categories/CategoriesApiModel";
import { usePostCreate } from "../../api/posts/PostsApiHook";
import { useHashtagByName } from "../../api/hashtags/HashtagsApiHook";
import { HashtagViewModel } from "../../api/hashtags/HashtagsApiModel";
import { useUsersByEmail } from "../../api/users/UsersApiHook";
import MediaSection, { UploadedImage } from "./MediaSection";
import { UserTagNode } from "./AddPostUtils";
import { HomeStackParamList } from "../../shared/navigation/HomeStackScreen";
import FloatingButton from "../../shared/components/FloatingButton";

type AddPostScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  "AddPost"
>;
type AddPostScreenRouteProp = RouteProp<HomeStackParamList, "AddPost">;
interface SubmitState {
  isValid: boolean;
  text: string;
  hashTags: string[];
  userTags: string[];
  uploadedContentsId: string[];
  category: CategoryViewModel;
}
export default function AddPostScreen() {
  const { post, result, isError } = usePostCreate();
  const { result: hashTags, setRequestInfo: fetchTags } = useHashtagByName();
  const { result: userTags, setRequestInfo: fetchUserTags } = useUsersByEmail();
  const [hashs, setHashs] = useState([]);

  const [submitState, setSubmitState] = useState<SubmitState>({
    category: undefined,
    isValid: false,
    hashTags: [],
    userTags: [],
    uploadedContentsId: [],
    text: "",
  });
  const navigation = useNavigation<AddPostScreenNavigationProp>();
  const route = useRoute<AddPostScreenRouteProp>();

  const onSubmit = useCallback(() => {
    if (submitState.isValid) {
      post({
        categoryId: submitState.category.id,
        text: submitState.text,
        hashTags: submitState.hashTags,
        userTags: submitState.userTags,
      });
    }
  }, [submitState]);

  const isValidState = useCallback(
    (text: string, category: CategoryViewModel) => {
      return text.length > 0 && category !== undefined && category !== null;
    },
    []
  );

  useEffect(() => {
    console.log("useEffect AddPostScreen", result, isError);
    if (result && !isError) {
      navigation.navigate("Home");
      console.log("Homes");
    }
  }, [result, isError]);

  useEffect(() => {
    if (route && route.params && route.params.category) {
      setSubmitState((prev) => ({
        ...prev,
        category: route.params.category,
        isValid: isValidState(prev.text, route.params.category),
      }));
    }
  }, [route]);

  const onHashTagChange = (searchText: string) => {
    console.log("onHashTagChange");
    // fetchTags((prev) => ({
    //   wait: false,
    //   info: {
    //     ...prev.info,
    //     queryParams: [{ key: "name", value: searchText }],
    //   },
    // }));
    setHashs([
      { name: "ako1" },
      { name: "ako2" },
      { name: "ako3" },
      { name: "ako4" },
      { name: "ako5" },
      { name: "ako6" },
      { name: "ako7" },
      { name: "ako8" },
      { name: "ako9" },
      { name: "ako10" },
      { name: "ako11" },
      { name: "ako12" },
    ]);
  };

  const onUserTagChange = (searchText: string) => {
    fetchUserTags((prev) => ({
      wait: false,
      info: {
        ...prev.info,
        queryParams: [{ key: "name", value: searchText }],
      },
    }));
  };

  const navigateToChooseCategory = () => {
    navigation.navigate("ChooseCategory");
  };

  const onTextChange = (textStateChange: TextStateChange) => {
    const hashTags = textStateChange.textNodes
      .filter((node) => node.type === "#")
      .map((node) => node.value.split("#")[1]);
    const userTags = textStateChange.textNodes
      .filter((node) => node.type === "@")
      .map((node) => (node as UserTagNode).userId);
    setSubmitState((prev) => ({
      ...prev,
      text: textStateChange.text,
      hashTags,
      userTags,
      isValid: isValidState(textStateChange.text, prev.category),
    }));
  };

  const onUploadedContentsChange = (photos: UploadedImage[]) => {
    setSubmitState((prev) => ({
      ...prev,
      uploadedContentsId: photos.map((p) => p.fileId),
    }));
  };
  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled" style={{ flex: 1 }}>
        <ChooseCategoryPanel
          chosenCategory={submitState.category}
          style={styles.chooseCategoryPanel}
          onClick={navigateToChooseCategory}
        />
        <PostText
          onHashTagChange={onHashTagChange}
          onUserTagChange={onUserTagChange}
          onTextChange={onTextChange}
          placeHolder="Post text..."
          hashTags={hashs || []}
          userTags={userTags || []}
        />
        <MediaSection onUploadedContentsChange={onUploadedContentsChange} />
      </ScrollView>
      <FloatingButton
        color={"rgb(50,255,100)"}
        onPress={onSubmit}
        type={"confirm"}
        disabled={!submitState.isValid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chooseCategoryPanel: {
    marginBottom: 10,
  },
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
  },
});
