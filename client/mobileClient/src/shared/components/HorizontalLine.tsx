import React from 'react'
import { View } from 'react-native';


interface Props {
  mode: "fill" | "short"
}
export default function HorizontalLine({ mode }: Props) {
  return <View
    style={[{
      borderBottomColor: 'grey',
      borderBottomWidth: 0.2,
      alignSelf: 'center'
    }, mode === "fill" ? { width: "100%" } : { width: 200 }]}
  />;
}