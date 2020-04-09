import { useApiErrorHandling } from "../../shared/exceptionHandling/ExceptionHandlingHooks";

export type TextNode = HashTagNode | UserTagNode | PlainTextNode;
export type TextNodeType = typeof hashTagSymbol | typeof userTagSymbol | typeof plainText;
export interface TextNodeBase {
  value: string;
  startIndex: number;
  endIndex: number;
}
export interface HashTagNode extends TextNodeBase {
  type: typeof hashTagSymbol;
}
export interface UserTagNode extends TextNodeBase {
  type: typeof userTagSymbol;
}
export interface PlainTextNode extends TextNodeBase {
  type: typeof plainText;
}
export const hashTagSymbol = "#";
export const userTagSymbol = "@";
export const plainText = "PlainText"


export function extractNodesFromInputText(text: string): TextNode[] {
  const nodes: TextNode[] = [];
  for (let index = 0; index < text.length; index++) {
    const elem = text.charAt(index);
    let node: TextNode;
    switch (elem) {
      case hashTagSymbol:
      case userTagSymbol: {
        const { node: newNode, newIndex } = getNode(text, index, isDeilimiter);
        node = newNode;
        index = newIndex;
        break;
      }
      default:
        {
          const { node: newNode, newIndex } = getNode(text, index, isHashOrUserTag);
          node = newNode;
          index = newIndex;
          break;
        }
    }
    nodes.push(node);
  }

  return nodes;
}

interface Result {
  node: TextNode;
  newIndex: number;
}
const getNode = (text: string, index: number, isDeilimiter: (char: string) => boolean): Result => {
  let startingElem = text.charAt(index);
  let nodeType = getNodeType(startingElem);
  let name = startingElem;
  let localIndex = index;
  let startIndex = index;
  localIndex++;
  while (localIndex < text.length && !isDeilimiter(text.charAt(localIndex))) {
    name += text.charAt(localIndex);
    localIndex++;
  }
  localIndex--;
  return {
    newIndex: localIndex,
    node: { startIndex, endIndex: localIndex, value: name, type: nodeType }
  };

}
const getNodeType = (char: string): TextNodeType => {
  switch (char) {
    case hashTagSymbol:
      return "#";
    case userTagSymbol:
      return "@";
    default:
      return "PlainText";
  }
}
const isDeilimiter = (char: string) => {
  return char === hashTagSymbol || char === userTagSymbol || char === ' ';
}
const isHashOrUserTag = (char: string) => {
  return char === hashTagSymbol || char === userTagSymbol;
}