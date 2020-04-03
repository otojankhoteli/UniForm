import React from 'react'
import { Avatar } from 'react-native-elements'


interface Props {

}
export default function AvatarCustom(_: Props) {
    return <Avatar
        rounded
        source={{
            uri:
                'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        }}
    />
}