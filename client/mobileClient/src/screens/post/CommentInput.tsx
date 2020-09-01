import React, { useState, useMemo } from "react";
import { useGlobalState } from "../../shared/globalState/AppContext";
import { View, Text, Image, TextInput, TouchableHighlight } from "react-native";
import { UserViewModel } from "../../api/users/UsersApiModel";
import { useCreateComment } from "../../api/comments/CommentsApiHook";
import Icon from "react-native-vector-icons/Feather";

interface Props {
  readonly postId: string;
}

const CommentInput: React.FC<Props> = (props) => {
  const [{ account }] = useGlobalState();

  const { post: createComment, isLoading, error, isError } = useCreateComment();

  const user: UserViewModel = useMemo(() => {
    // if (account && account.user) return account.user;
    return {
      id: "1",
      email: "tbubu14@freeuni.edu.ge",
      name: "Tornike",
      surname: "Bubuteishvili",
      photoURL:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.askmen.com%2F1080x540%2F2016%2F01%2F25-021526-facebook_profile_picture_affects_chances_of_getting_hired.jpg&f=1&nofb=1",
      role: "student",
    };
  }, []);

  const [inputText, setInputText] = useState("");

  return (
    <View
      style={{
        padding: 5,
        marginTop: 5,
        backgroundColor: "rgb(252,252,252)",
        elevation: 1,
      }}
    >
      <Text style={{ fontSize: 14, color: "rgb(150,150,150)", marginLeft: 15 }}>
        Comment as{" "}
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "black" }}>
          {user.name} {user.surname}
        </Text>
      </Text>
      <View
        style={{
          padding: 5,
        }}
      >
        {/* <Image
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            marginHorizontal: 10,
          }}
          source={{ uri: user.photoURL }}
        ></Image> */}
        <TextInput
          style={{
            borderWidth: 0.5,
            borderColor: "rgba(0,0,0,0.4)",
            padding: 10,
            backgroundColor: "white",
          }}
          value={inputText}
          onChangeText={(text) => {
            setInputText(text);
          }}
          placeholder={"Add a comment..."}
        ></TextInput>
        <TouchableHighlight
          style={{
            position: "absolute",
            right: 15,
            top: 10,
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: "rgba(0,0,0,0)",
            justifyContent: "center",
            alignItems: "center",
          }}
          underlayColor={"rgba(0,0,0,0.1)"}
          onPress={() => {
            createComment({
              authorId: user.id,
              postId: props.postId,
              text: inputText,
              userTags: [],
            });
          }}
        >
          <Icon
            name={"send"}
            size={25}
            color={inputText.length > 0 ? "rgb(100,200,255)" : "gray"}
          ></Icon>
        </TouchableHighlight>
      </View>
      <Text
        style={{
          fontSize: 16,
          color: "rgb(150,150,150)",
          marginVertical: 10,
          marginLeft: 15,
        }}
      >
        Comments
      </Text>
    </View>
  );
};

export default CommentInput;
