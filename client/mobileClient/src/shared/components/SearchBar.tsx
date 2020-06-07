import React, { useState } from 'react';
import { SearchBar } from 'react-native-elements'
import { TextStyle, StyleProp } from 'react-native';
import { MainColor } from '../Const';

interface Props {
  onChangeText: (text: string) => void;
  style?: StyleProp<TextStyle>;
}
export default function SearchBarCustom({ onChangeText, style }: Props) {
  const [text, setText] = useState("");

  const onChangeTextInternal = (text: string) => {
    setText(text);
    onChangeText(text);
  }

  return <SearchBar
    lightTheme
    value={text}
    onChangeText={onChangeTextInternal}
    inputStyle={{ flex: 1, borderWidth: 0 }}
    inputContainerStyle={{ backgroundColor: "white" }}
    containerStyle={[{ flex: 1, backgroundColor: "white", borderWidth: 0 }, style]}
    style={[style, { flex: 1, borderWidth: 0 }]} />
}
