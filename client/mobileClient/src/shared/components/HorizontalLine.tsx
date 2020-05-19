import React from 'react'
import { View, StyleProp, ViewStyle } from 'react-native';


interface Props {
  style?: StyleProp<ViewStyle>;
  mode: "fill" | "short"
}
export default function HorizontalLine({ style, mode }: Props) {
  return <View
    style={[{
      borderBottomColor: 'grey',
      borderBottomWidth: 0.2,
      alignSelf: 'center'
    }, mode === "fill" ? { width: "100%" } : { width: 200 }, style]}
  />;
}