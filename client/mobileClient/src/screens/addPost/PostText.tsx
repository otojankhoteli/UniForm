import React, { useState, useEffect, memo, useCallback, useMemo } from "react";
import { View, StyleProp, ViewStyle, NativeSyntheticEvent, TextInputSelectionChangeEventData, Text, StyleSheet, TextInput } from "react-native";
import { Input } from "react-native-elements";
import { PostHashTag, HashTagSuggestionPopUp } from "./HashTagSuggestionPopUp";
import UserTagSuggestionPopUp, { UserTag } from "./UserTagSuggestionPopUp";
import { findFirst } from "../../shared/Utils";
import { hashTagSymbol, userTagSymbol, HashTagNode, UserTagNode, TextNode, extractNodesFromInputText, TextNodeType } from "./AddPostUtils";
import { TextWithTags } from "./TextWithTags";



interface Props {
  style?: StyleProp<ViewStyle>;
  placeHolder?: string;
  hashTags: PostHashTag[];
  symbolLimit?: number;
  userTags: UserTag[];
  onHashTagChange: (searchText: string) => void;
  onUserTagChange: (searchText: string) => void;
  updateHashTags?: (tags: string[]) => void;
  onTextChange?: (text: string) => void;
}

interface State {
  text: string;
  activeNode?: TextNode;
  isTextUpdated: boolean,
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
  selection: { end: 0, start: 0 }
};

const SymbolLimit = 400;
// eslint-disable-next-line no-useless-escape
const regexForHashTag = /((?:#[^#\r\n\ \@]*){1})$/;
// eslint-disable-next-line no-useless-escape
const regexUserTag = /((?:@[^@\r\n\ \#]*){1})$/;
const delimiters = [typeof hashTagSymbol, typeof userTagSymbol, ' '];
export const PostText = memo(({ style, userTags, hashTags, placeHolder, symbolLimit, onUserTagChange, onHashTagChange, updateHashTags, onTextChange }: Props) => {
  const [state, setState] = useState(initialState);
  const hashTagsInText = useMemo(() => state.textNodes.filter(n => n.type === "#" && n.value.length > 1).map(n => n.value), [state.textNodes]);


  useEffect(() => {
    if (state.activeNode) {
      switch (state.activeNode.type) {
        case "#":
          {
            const hashTag = state.activeNode.value;
            onHashTagChange(hashTag.length > 1 ? hashTag.substr(1) : "");
            break;
          }
        case "@":
          {
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
    onTextChange(state.text);
  }, [state]);

  const onChangeText = useCallback((text: string) => {
    setState(state => ({ ...state, text, isTextUpdated: state.text !== text }));
  }, []);

  const onSelectionChange = useCallback(({ nativeEvent: { selection } }: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
    if (!state.isTextUpdated) {
      setState(state => ({ ...state, selection }));
      return;
    }
    const { text } = state;
    const cursorPosition = selection.end;
    const endIndex = findFirst(state.text, delimiters, cursorPosition);
    const textSubstring = text.substring(0, endIndex);

    const hashTagMatch = textSubstring.match(regexForHashTag);
    const userTagMatch = textSubstring.match(regexUserTag);
    const textNodes = extractNodesFromInputText(text);

    if (hashTagMatch && hashTagMatch.length > 0) {
      const match = hashTagMatch[0];
      const activeNode: HashTagNode = { value: match, startIndex: endIndex - match.length, endIndex, type: "#" };
      setState(prevState => ({ ...prevState, activeNode, text, isTextUpdated: false, textNodes, selection }));
    } else if (userTagMatch && userTagMatch.length > 0) {
      const match = userTagMatch[0];
      const activeNode: UserTagNode = { value: match, startIndex: endIndex - match.length, endIndex, type: "@" };
      setState(prevState => ({ ...prevState, activeNode, text, isTextUpdated: false, textNodes, selection }));
    } else {
      setState(prevState => ({ ...prevState, activeNode: undefined, text, isTextUpdated: false, textNodes, selection }));
    }
  }, [state]);


  const tagSelect = (state: State, selectedTag: string, textNodeType: TextNodeType) => {
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
      ...state, text, textNodes,
      activeNode: { value: middle, startIndex: active.startIndex, endIndex: active.startIndex + middle.length, type: textNodeType },
      selection: { start: active.startIndex + middle.length, end: active.startIndex + middle.length }
    });
  }

  // duplicate
  const onHashTagSelect = useCallback((selectedTag: string) => {
    tagSelect(state, selectedTag, "#")
  }, [state]);

  // duplicate
  const onUserTagSelect = useCallback((selectedTag: string) => {
    tagSelect(state, selectedTag, "@")
  }, [state]);

  const getIsSuggestionVisible = useCallback((type: TextNodeType) => state.activeNode
    && state.activeNode.type === type
    && state.selection.end <= state.activeNode.endIndex
    && state.selection.end >= state.activeNode.startIndex
    && !(type === "#" ?
      hashTags.length === 1 && state.activeNode.value === (hashTagSymbol + hashTags[0].tag) :
      userTags.length === 1 && state.activeNode.value === (userTagSymbol + userTags[0].username)), [state, hashTags]);

  return (
    <View style={style}>
      <TextInput style={styles.inputStyle} underlineColorAndroid="transparent" selection={state.selection} onSelectionChange={onSelectionChange} multiline onChangeText={onChangeText} placeholder={placeHolder} maxLength={symbolLimit || SymbolLimit}>
        <TextWithTags nodes={state.textNodes} />
      </TextInput>
      <View style={styles.textBottomPanel}>
        <View style={styles.textBottomActionContainer}>
          <HashTagSuggestionPopUp isVisible={getIsSuggestionVisible("#")} hashTags={hashTags} onSelect={onHashTagSelect} />
          <UserTagSuggestionPopUp isVisible={getIsSuggestionVisible("@")} userTags={userTags} onSelect={onUserTagSelect} />
          <Text style={styles.textSymbolCount}>{state.text.length}/{symbolLimit || SymbolLimit}</Text>
        </View>
      </View>
    </View>
  );
});
const styles = StyleSheet.create({
  inputStyle: {
    fontSize: 15,
    marginLeft: 10
  },
  textBottomActionContainer: {
    flexDirection: "row",
  },
  textBottomPanel: {
    height: 150
  },
  textSymbolCount: {
    marginLeft: "auto",
    marginRight: 5,
    marginTop: 5
  }
});


