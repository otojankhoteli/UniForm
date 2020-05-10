import React from 'react'
import { Avatar } from 'react-native-elements'


interface Props {
  photoUrl: string
}
export default function AvatarCustom({ photoUrl }: Props) {
  return <Avatar
    rounded
    source={{
      uri:
        photoUrl,
    }}
  />
}