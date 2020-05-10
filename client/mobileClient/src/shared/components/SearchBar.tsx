import React, { useState } from 'react';
import { SearchBar } from 'react-native-elements'
import { MainColor } from '../Const';

interface Props {
  onChangeText: (text: string) => void;
}
export default function SearchBarCustom({ onChangeText }: Props) {
  const [text, setText] = useState("");

  const onChangeTextInternal = (text: string) => {
    setText(text);
    onChangeText(text);
  }

  return <SearchBar
    lightTheme
    value={text}
    onChangeText={onChangeTextInternal}
    inputStyle={{ flex: 1 }}
    inputContainerStyle={{ backgroundColor: "white" }}
    containerStyle={{ backgroundColor: MainColor, borderWidth: 0 }}
    style={{ flex: 1, borderWidth: 0 }} />
}
