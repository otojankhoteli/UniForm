
import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-elements'

export interface PostHashTag {
  name: string;
}
interface Props {
  isVisible: boolean;
  hashTags: PostHashTag[];
  onSelect: (selectedTag: string) => void;
}
export const HashTagSuggestionPopUp = ({ hashTags, isVisible, onSelect }: Props) => {
  const [isVisibleInternal, setIsVisibleInternal] = useState(isVisible);

  useEffect(() => {
    setIsVisibleInternal(isVisible);
  }, [isVisible])

  const onSelectInternal = (selectedTag: string) => {
    onSelect(selectedTag);
  }

  return isVisibleInternal && hashTags.length > 0 ?
    <View style={styles.container}>
      {hashTags.map(hashTag => <TouchableOpacity key={hashTag.name}
        onPress={() => onSelectInternal(hashTag.name)}
      >
        <Text>{hashTag.name}</Text>
      </TouchableOpacity>)}
    </View>
    : null;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(250, 256, 256, 1)',
    borderRadius: 10,
    display: "flex",
    elevation: 10,
    flexDirection: "column",
    marginLeft: 10,
    marginTop: 10,
    padding: 5,
    width: 100,
    zIndex: 10000
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  }
});