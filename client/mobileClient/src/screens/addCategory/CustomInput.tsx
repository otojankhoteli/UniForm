import React from "react";
import { View, Text, TextInput } from "react-native";

interface Props {
  readonly text: string;
  readonly placeholder: string;
  readonly value: string;
  readonly onChangeText: (text: string) => void;
  readonly multiline: boolean;
  readonly characterLimit?: number;
}

const CustomInput: React.FC<Props> = (props) => {
  return (
    <View style={{ padding: 10 }}>
      <View style={{ flexDirection: "row", marginBottom: 5 }}>
        <Text style={{ fontSize: 14, color: "rgb(80,80,80)" }}>
          {props.text}
        </Text>
        {props.characterLimit && (
          <Text
            style={{
              fontSize: 15,
              color: "rgb(100,100,100)",
              marginLeft: "auto",
            }}
          >
            {props.value.length}/{props.characterLimit}
          </Text>
        )}
      </View>
      <TextInput
        style={{ height: 50 }}
        underlineColorAndroid={"transparent"}
        value={props.value}
        onChangeText={(text: string) => {
          if (text.length <= props.characterLimit) props.onChangeText(text);
        }}
        multiline={props.multiline}
      ></TextInput>
    </View>
  );
};

export default CustomInput;
