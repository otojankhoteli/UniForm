import React, { useState, useEffect, memo, useCallback, useMemo } from "react";
import { View, StyleProp, ViewStyle, NativeSyntheticEvent, TextInputSelectionChangeEventData } from "react-native";
import { Input, Text } from "react-native-elements";
import { PostHashTag, HashTagSuggestionPopUp } from "./HashTagSuggestionPopUp";
import UserTagSuggestionPopUp, { UserTag } from "./UserTagSuggestionPopUp";
import { findFirst } from "../../shared/Utils";
import { hashTagSymbol, userTagSymbol, HashTagNode, UserTagNode, TextNode, extractNodesFromInputText, TextNodeType } from "./AddPostUtils";
import { TextWithTags } from "./TextWithTags";



interface Props {
  style?: StyleProp<ViewStyle>;
  postHashTags: PostHashTag[];
  userTags: UserTag[];
  onHashTagChange: (searchText: string) => void;
  onUserTagChange: (searchText: string) => void;
  updateHashTags: (tags: string[]) => void;
  onTextChange?: (text: string) => void;
}

interface State {
  postText: string;
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
  postText: "",
  isTextUpdated: false,
  textNodes: [],
  selection: { end: 0, start: 0 }
};


// eslint-disable-next-line no-useless-escape
const regexForHashTag = /((?:#[^#\r\n\ \@]*){1})$/;
// eslint-disable-next-line no-useless-escape
const regexUserTag = /((?:@[^@\r\n\ \#]*){1})$/;
const delimiters = [typeof hashTagSymbol, typeof userTagSymbol, ' '];
export const PostText = memo(({ style, userTags, postHashTags, onUserTagChange, onHashTagChange, updateHashTags, onTextChange }: Props) => {
  const [state, setState] = useState(initialState);
  const postTagsInText = useMemo(() => state.textNodes.filter(n => n.type === "#").map(n => n.value), [state.textNodes]);

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
    updateHashTags(postTagsInText);
    onTextChange(state.postText);
  }, [state]);

  const onChangeText = useCallback((text: string) => {
    setState(state => ({ ...state, postText: text, isTextUpdated: state.postText !== text }));
  }, []);

  const onSelectionChange = useCallback(({ nativeEvent: { selection } }: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
    if (!state.isTextUpdated) {
      setState(state => ({ ...state, selection }));
      return;
    }
    const { postText } = state;
    const cursorPosition = selection.end;
    const endIndex = findFirst(state.postText, delimiters, cursorPosition);
    const textStr = postText.substring(0, endIndex);

    const hashTagMatch = textStr.match(regexForHashTag);
    const userTagMatch = textStr.match(regexUserTag);
    const textNodes = extractNodesFromInputText(postText);

    if (hashTagMatch && hashTagMatch.length > 0) {
      const match = hashTagMatch[0];
      const activeNode: HashTagNode = { value: match, startIndex: endIndex - match.length, endIndex, type: "#" };
      setState(prevState => ({ ...prevState, activeNode, postText, isTextUpdated: false, textNodes, selection }));
    } else if (userTagMatch && userTagMatch.length > 0) {
      const match = userTagMatch[0];
      const activeNode: UserTagNode = { value: match, startIndex: endIndex - match.length, endIndex, type: "@" };
      setState(prevState => ({ ...prevState, activeNode, postText, isTextUpdated: false, textNodes, selection }));
    } else {
      setState(prevState => ({ ...prevState, postText, isTextUpdated: false, textNodes, activeNode: undefined, selection }));
    }
  }, [state]);


  const tagSelect = (state: State, selectedTag: string, textNodeType: TextNodeType) => {
    const active = state.activeNode;
    const start = state.postText.substring(0, active.startIndex);
    const middle = `${textNodeType}${selectedTag}`;
    const end = state.postText.substring(active.endIndex, state.postText.length);
    const postText = `${start}${middle}${end}`;
    const textNodes = extractNodesFromInputText(postText);
    setState({
      ...state, postText, textNodes,
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

  const getIsSuggestionVisible = (type: TextNodeType) => state.activeNode
    && state.activeNode.type === type
    && state.selection.end <= state.activeNode.endIndex
    && state.selection.end >= state.activeNode.startIndex;


  return (
    <View style={style}>
      <Input selection={state.selection} onSelectionChange={onSelectionChange} multiline onChangeText={onChangeText} placeholder="Your post text">
        <TextWithTags nodes={state.textNodes} />
      </Input>
      <HashTagSuggestionPopUp isVisible={getIsSuggestionVisible("#")} hashTags={postHashTags} onSelect={onHashTagSelect} />
      <UserTagSuggestionPopUp isVisible={getIsSuggestionVisible("@")} userTags={userTags} onSelect={onUserTagSelect} />
    </View>
  );
});



