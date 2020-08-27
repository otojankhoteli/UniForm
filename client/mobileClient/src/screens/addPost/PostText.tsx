import React, { useState, useEffect, memo, useCallback, useMemo } from "react";
import {
  View,
  StyleProp,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputSelectionChangeEventData,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import { PostHashTag, HashTagSuggestionPopUp } from "./HashTagSuggestionPopUp";
import UserTagSuggestionPopUp, { UserTag } from "./UserTagSuggestionPopUp";
import { findFirst } from "../../shared/Utils";
import {
  hashTagSymbol,
  userTagSymbol,
  HashTagNode,
  UserTagNode,
  TextNode,
  extractNodesFromInputText,
  TextNodeType,
  matchFirstUserTagReverse,
  getNodesWithPopulatedUserId,
  getNodesWithPopulatedUserIds,
} from "./AddPostUtils";
import { TextWithTags } from "./TextWithTags";
import { HashtagViewModel } from "../../api/hashtags/HashtagsApiModel";
import { UserViewModel } from "../../api/users/UsersApiModel";

interface Props {
  style?: StyleProp<ViewStyle>;
  placeHolder?: string;
  hashTags: HashtagViewModel[];
  symbolLimit?: number;
  userTags: UserViewModel[];
  onHashTagChange: (searchText: string) => void;
  onUserTagChange: (searchText: string) => void;
  updateHashTags?: (tags: string[]) => void;
  onTextChange?: (textStateChange: TextStateChange) => void;
}
export interface TextStateChange {
  text: string;
  textNodes: TextNode[];
}
interface State {
  text: string;
  activeNode?: TextNode;
  isTextUpdated: boolean;
  textNodes: TextNode[];
  selection: TextSelectionState;
}
interface TextSelectionState {
  start: number;
  end: number;
}
const initialState: State = {
  text: "",
  isTextUpdated: false,
  textNodes: [],
  selection: { end: 0, start: 0 },
};

const SymbolLimit = 400;
// eslint-disable-next-line no-useless-escape
const regexForHashTag = /((?:#[^#\r\n\ \@]*){1})$/;
const delimiters = [typeof hashTagSymbol, typeof userTagSymbol, " "];
export const PostText = memo(
  ({
    style,
    userTags,
    hashTags,
    placeHolder,
    symbolLimit,
    onUserTagChange,
    onHashTagChange,
    updateHashTags,
    onTextChange,
  }: Props) => {
    const [state, setState] = useState(initialState);
    const hashTagsInText = useMemo(
      () =>
        state.textNodes
          .filter((n) => n.type === "#" && n.value.length > 1)
          .map((n) => n.value),
      [state.textNodes]
    );

    useEffect(() => {
      if (state.activeNode) {
        switch (state.activeNode.type) {
          case "#": {
            const hashTag = state.activeNode.value;
            onHashTagChange(hashTag.length > 1 ? hashTag.substr(1) : "");
            break;
          }
          case "@": {
            const hashTag = state.activeNode.value;
            onUserTagChange(hashTag.length > 1 ? hashTag.substr(1) : "");
            break;
          }
          default:
            break;
        }
      }
      if (updateHashTags) {
        updateHashTags(hashTagsInText);
      }
      onTextChange({ ...state });
    }, [state]);

    const onChangeText = useCallback((text: string) => {
      setState((state) => ({
        ...state,
        text,
        isTextUpdated: state.text !== text,
      }));
    }, []);

    const onSelectionChange = useCallback(
      ({
        nativeEvent: { selection },
      }: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
        if (!state.isTextUpdated) {
          setState((state) => ({ ...state, selection }));
          return;
        }
        const { text } = state;
        const cursorPosition = selection.end;
        const endIndex = findFirst(state.text, delimiters, cursorPosition);
        const textSubstring = text.substring(0, endIndex);

        const hashTagMatch = textSubstring.match(regexForHashTag);
        const userTagMatch = matchFirstUserTagReverse(textSubstring);
        // const userTagMatch = textSubstring.match(regexUserTag);
        const textNodes = getNodesWithPopulatedUserIds(
          extractNodesFromInputText(text),
          state.textNodes
        );

        if (hashTagMatch && hashTagMatch.length > 0) {
          const match = hashTagMatch[0];
          const activeNode: HashTagNode = {
            value: match,
            startIndex: endIndex - match.length,
            endIndex,
            type: "#",
          };
          setState((prevState) => ({
            ...prevState,
            activeNode,
            text,
            isTextUpdated: false,
            textNodes,
            selection,
          }));
        } else if (userTagMatch && userTagMatch.length > 0) {
          // const match = userTagMatch[0];
          const match = userTagMatch;
          const userTag =
            state.textNodes.find(
              (node) => node.type === "@" && node.value === match
            ) || {};
          const activeNode: UserTagNode = {
            ...userTag,
            value: match,
            startIndex: endIndex - match.length,
            endIndex,
            type: "@",
          };
          setState((prevState) => ({
            ...prevState,
            activeNode,
            text,
            isTextUpdated: false,
            textNodes,
            selection,
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            activeNode: undefined,
            text,
            isTextUpdated: false,
            textNodes,
            selection,
          }));
        }

        // console.log("state", state);
      },
      [state]
    );

    const onHashTagSelect = useCallback(
      (selectedTag: string) => {
        const textNodeType: TextNodeType = "#";
        const active = state.activeNode;
        const start = state.text.substring(0, active.startIndex);
        const middle = `${textNodeType}${selectedTag}`;
        const end = state.text.substring(active.endIndex, state.text.length);
        const text = `${start}${middle}${end}`;
        const textNodes = extractNodesFromInputText(text);
        if (state.text.length + middle.length > (SymbolLimit || symbolLimit)) {
          return;
        }
        setState({
          ...state,
          text,
          textNodes,
          activeNode: {
            value: middle,
            startIndex: active.startIndex,
            endIndex: active.startIndex + middle.length,
            type: textNodeType,
          },
          selection: {
            start: active.startIndex + middle.length,
            end: active.startIndex + middle.length,
          },
        });
      },
      [state]
    );

    const onUserTagSelect = useCallback(
      (selectedTag: string, userId: string) => {
        const textNodeType: TextNodeType = "@";
        const active = state.activeNode;
        const start = state.text.substring(0, active.startIndex);
        const middle = `${textNodeType}${selectedTag}`;
        const end = state.text.substring(active.endIndex, state.text.length);
        const text = `${start}${middle}${end}`;
        const textNodes = getNodesWithPopulatedUserId(
          extractNodesFromInputText(text),
          selectedTag,
          userId
        );
        console.log("textNodes", textNodes);
        if (state.text.length + middle.length > (SymbolLimit || symbolLimit)) {
          return;
        }
        setState({
          ...state,
          text,
          textNodes,
          activeNode: {
            value: middle,
            startIndex: active.startIndex,
            endIndex: active.startIndex + middle.length,
            type: textNodeType,
            userId,
          },
          selection: {
            start: active.startIndex + middle.length,
            end: active.startIndex + middle.length,
          },
        });
      },
      [state]
    );

    const getIsSuggestionVisible = useCallback(
      (type: TextNodeType) =>
        state.activeNode &&
        state.activeNode.type === type &&
        state.selection.end <= state.activeNode.endIndex &&
        state.selection.end >= state.activeNode.startIndex &&
        !(type === "#"
          ? hashTags.length === 1 &&
            state.activeNode.value === hashTagSymbol + hashTags[0].name
          : userTags.length === 1 &&
            state.activeNode.value === userTagSymbol + userTags[0].email),
      [state, hashTags]
    );

    return (
      <View
        style={{
          padding: 10,
          paddingTop: 0,
        }}
      >
        <View style={style}>
          <View style={{ flexDirection: "row", marginBottom: 5 }}>
            <Text
              style={{ marginLeft: 5, fontSize: 14, color: "rgb(120,120,120)" }}
            >
              Text
            </Text>
            <Text style={styles.textSymbolCount}>
              {state.text.length}/{symbolLimit || SymbolLimit}
            </Text>
          </View>
          <TextInput
            style={styles.inputStyle}
            underlineColorAndroid="transparent"
            selection={state.selection}
            onSelectionChange={onSelectionChange}
            multiline
            onChangeText={onChangeText}
            placeholder={placeHolder}
            maxLength={symbolLimit || SymbolLimit}
          >
            <TextWithTags nodes={state.textNodes} />
          </TextInput>
          <View style={styles.textBottomPanel}>
            <View style={styles.textBottomActionContainer}>
              <HashTagSuggestionPopUp
                isVisible={getIsSuggestionVisible("#")}
                hashTags={hashTags}
                onSelect={onHashTagSelect}
              />
              <UserTagSuggestionPopUp
                isVisible={getIsSuggestionVisible("@")}
                userTags={userTags}
                onSelect={onUserTagSelect}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
);
const styles = StyleSheet.create({
  inputStyle: {
    fontSize: 15,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.3)",
    padding: 10,
  },
  textBottomActionContainer: {
    flexDirection: "row",
  },
  textBottomPanel: {},
  textSymbolCount: {
    marginLeft: "auto",
    marginRight: 5,
    color: "rgb(120,120,120)",
  },
});
