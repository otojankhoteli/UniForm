import React from 'react'
import { Avatar } from 'react-native-elements'
import { StyleProp, ViewStyle } from 'react-native'


interface Props {
  style?: StyleProp<ViewStyle>;
  photoUrl: string
}
export default function AvatarCustom({ style, photoUrl }: Props) {
  return <Avatar
    containerStyle={style}
    rounded
    size={40}
    source={{
      uri:
        photoUrl || null,
    }}
  />
}