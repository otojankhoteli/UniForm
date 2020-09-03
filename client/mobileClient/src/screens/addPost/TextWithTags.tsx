import React, { memo } from "react";
import { Text } from "react-native-elements";
import { TextNode } from "./AddPostUtils";
import { View, StyleSheet } from "react-native";

interface Props {
  nodes: TextNode[];
  viewMode: TextWithTagsViewMode;
}
export type TextWithTagsViewMode = "Input" | "Rest";
export const TextWithTags = memo(({ nodes, viewMode }: Props) => {
  const getKey = (node: TextNode) =>
    `TextWithTags${node.value}${node.startIndex}${node.endIndex}`;
  const getText = (node: TextNode) => {
    switch (node.type) {
      case "#":
        return (
          <Text key={getKey(node)} style={{ color: "blue", fontSize: 16 }}>
            {node.value}
          </Text>
        );
      case "@":
        return (
          <Text key={getKey(node)} style={{ color: "green", fontSize: 16 }}>
            {node.value}
          </Text>
        );
      default:
        return (
          <Text key={getKey(node)} style={{ fontSize: 16 }}>
            {node.value}
          </Text>
        );
    }
  };

  return viewMode === "Rest" ? <View style={styles.nodeContainer}>
    {nodes.map(getText)}
  </View> : <>{nodes.map(getText)}</>;
});
const styles = StyleSheet.create({
  nodeContainer: { display: "flex", flexDirection: "row", flexWrap: 'wrap' },
});
