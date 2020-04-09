import React from 'react';
import { Text, Badge } from "react-native-elements";
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { PostHashTag } from './HashTagSuggestionPopUp';

interface Props {
  hashTags: PostHashTag[]
}
export default function HashTags({ hashTags }: Props) {

  const getBadgeAdditionalStyles = (isVerified: boolean): StyleProp<ViewStyle> => {
    return isVerified ? { backgroundColor: "green" } : { backgroundColor: "#dacc37" };
  }

  return <View style={styles.container}>
    <Text style={styles.title}>#tags:</Text>
    <View style={styles.hashTagsContainer}>
      {hashTags.map(hashTag => <Badge status="primary"
        key={hashTag.tag}
        badgeStyle={[styles.badgeStyle, getBadgeAdditionalStyles(hashTag.isVerified)]}
        textStyle={styles.badgeText}
        value={hashTag.tag} />)}
    </View>
  </View>;
}
const styles = StyleSheet.create({
  badgeStyle: {
    marginRight: 6
  },
  badgeText: { marginBottom: 6, marginLeft: 10, marginRight: 10, marginTop: 3 },
  container: {

  },
  hashTagsContainer: {
    display: "flex",
    flexDirection: "row",
    margin: 10
  },
  title: {
    fontSize: 25,
    marginLeft: 20,
    marginTop: 20,
  }
});