import React, { useState, useEffect } from "react";
import { Text, Badge } from "react-native-elements";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { PostHashTag } from "./HashTagSuggestionPopUp";
import { MainColor } from "../../shared/Const";

interface Props {
  hashTags: PostHashTag[];
}
export default function HashTags({ hashTags }: Props) {
  const [state, setState] = useState(5);

  useEffect(() => {
    setState((state) => state + 1);
    setState((state) => state + 1);
  }, []);

  const getBadgeAdditionalStyles = (
    isVerified: boolean
  ): StyleProp<ViewStyle> => {
    return isVerified
      ? { backgroundColor: "green" }
      : { backgroundColor: "#dacc37" };
  };

  return (
    <View style={styles.container}>
      <Text
        onPress={() => {
          setState(6);
        }}
        style={styles.title}
      >
        #tags:{state}
      </Text>
      <ScrollView horizontal style={styles.hashTagsContainer}>
        {hashTags.map((hashTag) => (
          <Badge
            status="primary"
            key={hashTag.name}
            badgeStyle={[styles.badgeStyle]}
            textStyle={styles.badgeText}
            value={hashTag.name}
          />
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  badgeStyle: {
    marginRight: 6,
  },
  badgeText: { marginBottom: 6, marginLeft: 10, marginRight: 10, marginTop: 3 },
  container: {
    height: 90,
  },
  hashTagsContainer: {
    display: "flex",
    flexDirection: "row",
    margin: 10,
    minHeight: 30,
  },
  title: {
    color: MainColor,
    fontSize: 25,
    marginLeft: 10,
    marginTop: 20,
  },
});
