
import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-elements'
import { UserViewModel } from '../../api/users/UsersApiModel';


export interface UserTag {
  userId: string;
  username: string;
}
interface Props {
  isVisible: boolean;
  userTags: UserViewModel[];
  onSelect: (selectedTag: string) => void;
}
export default function UserTagSuggestionPopUp({ userTags, isVisible, onSelect }: Props) {
  return isVisible && userTags.length > 0 ?
    <View style={styles.container}>
      {userTags.map(hashTag => <TouchableOpacity key={hashTag.email}
        onPress={() => onSelect(hashTag.email)}
      >
        <Text>{hashTag.email}</Text>
      </TouchableOpacity>)}
    </View>
    : null;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(250, 256, 256, 1)',
    borderRadius: 10,
    elevation: 10,
    marginLeft: 10,
    marginTop: 10,
    padding: 5,
    width: 100
  },
});