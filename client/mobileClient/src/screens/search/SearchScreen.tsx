import React, { useState } from "react";
import { View, TextInput, TouchableHighlight, Text } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { Button } from "react-native-elements";
import AddPostButton from "../../shared/components/AddPostButton";

const SearchScreen: React.FC = () => {
  const [inputText, setInputText] = useState("");

  return (
    <View style={{ flex: 1, backgroundColor: "rgba(255, 255, 255, 1)" }}>
      <View
        style={{
          height: 50,
          margin: 10,
          borderWidth: 0.5,
          borderColor: "black",
          borderRadius: 10,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <FeatherIcon name={"search"} size={30} />
        <TextInput
          style={{ flex: 1, marginLeft: 10, fontSize: 16 }}
          value={inputText}
          onChangeText={(text) => {
            setInputText(text);
          }}
          onSubmitEditing={() => {
            alert("search for " + inputText);
          }}
        />
      </View>
      <AddPostButton
        onPress={() => {
          alert("new category");
        }}
        color={"rgba(32,255,64,1)"}
      />
    </View>
  );
};

export default SearchScreen;
