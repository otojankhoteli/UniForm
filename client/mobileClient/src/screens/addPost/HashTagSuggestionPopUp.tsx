
import React, { useState, memo, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-elements'
import useFloatingHeaderHeight from '@react-navigation/stack/lib/typescript/src/utils/useHeaderHeight';


export interface PostHashTag {
  tag: string;
  isVerified: boolean;
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

  return isVisibleInternal ?
    <View style={styles.container}>
      {hashTags.map(hashTag => <TouchableOpacity key={hashTag.tag}
        onPress={() => onSelectInternal(hashTag.tag)}
      >
        <Text>{hashTag.tag}</Text>
      </TouchableOpacity>)}
    </View>
    : null;
};

const styles = StyleSheet.create({

  container: {
    backgroundColor: 'rgba(250, 256, 256, 1)',
    borderRadius: 10,
    elevation: 10,
    justifyContent: "center",
    marginLeft: 10,
    marginTop: 10,
    padding: 5,
    width: 100
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  }
});