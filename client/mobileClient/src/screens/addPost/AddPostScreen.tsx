import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Icon, } from "react-native-elements";
import { PostText } from "./PostText";
import HashTags from "./HashTags";
import { UserTag } from "./UserTagSuggestionPopUp";
import { PostHashTag } from "./HashTagSuggestionPopUp";
import PostCategories from "./PostCategories";


const initialUserTags: UserTag[] = [{ userId: "test1", username: "ako" }, { userId: "test2", username: "bubuta" }, { userId: "test3", username: "janxeqsa" }];
const initialPostTags: PostHashTag[] = [{ tag: "uni", isVerified: true }, { tag: "macs", isVerified: true }, { tag: "sagamocdo", isVerified: false }];
export default function AddPostScreen() {
  const [userTags, setUserTags] = useState<UserTag[]>(initialUserTags);
  const [postTags, setPostTags] = useState<PostHashTag[]>(initialPostTags);
  const [choosenTags, setChoosenTags] = useState<PostHashTag[]>([]);

  const onSubmit = () => {
    //
  };

  const onHashTagChange = (searchText: string) => {
    const filtered = initialPostTags.filter(tag => tag.tag.indexOf(searchText) !== -1);
    setPostTags(filtered);
  }

  const onUserTagChange = (searchText: string) => {
    const filtered = initialUserTags.filter(tag => tag.username.indexOf(searchText) !== -1);
    setUserTags(filtered);
  }

  const updateHashTags = (tags: string[]) => {
    setChoosenTags(tags.map(tag => ({ tag, isVerified: true })));
  }

  return (
    <View style={styles.container}>
      <PostCategories />
      <HashTags hashTags={choosenTags} />
      <PostText onHashTagChange={onHashTagChange} onUserTagChange={onUserTagChange} postHashTags={postTags} userTags={userTags} updateHashTags={updateHashTags} />
      <View style={styles.submitButtonContainer}>
        <Button
          buttonStyle={styles.submitButton}
          disabledStyle={{ backgroundColor: "rgba(24, 160, 42, 0.3)" }}
          onPress={onSubmit}
          icon={
            <Icon
              name="check"
              type="font-awesome"
              color="white"
              size={25}
              style={styles.submitButtonIcon}
            />
          }
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  submitButton: {
    backgroundColor: "rgba(24, 160, 42, 1)",
    borderRadius: 25,
    elevation: 10,
    height: 50,
    marginRight: "auto",
    width: 50
  },
  submitButtonContainer: {
    alignItems: "center",
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    position: "absolute",
    width: "100%",
  },
  submitButtonIcon: {},
  // submitButtonSubContainer: { alignItems: "center", backgroundColor: 'rgba(250, 256, 256, 1)', borderRadius: 50, elevation: 10, height: 60, justifyContent: "center", width: 100 }
});
