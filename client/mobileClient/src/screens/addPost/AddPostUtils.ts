export type TextNode = HashTagNode | UserTagNode | PlainTextNode;
export type TextNodeType = typeof hashTagSymbol | typeof userTagSymbol | typeof plainText;
export interface TextNodeBase {
  value: string;
  startIndex: number;
  endIndex: number;
}
export interface HashTagNode extends TextNodeBase {
  type: typeof hashTagSymbol;
  // isVerified: boolean;
}
export interface UserTagNode extends TextNodeBase {
  type: typeof userTagSymbol;
  userId?: string;
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
      case hashTagSymbol: {
        const { node: newNode, newIndex } = getNode(text, index, isDeilimiter);
        node = newNode;
        index = newIndex;
        break;
      }
      case userTagSymbol: {
        if (index === 0 || (index >= 0 && text.charAt(index - 1) === ' ')) {
          const { node: newNode, newIndex } = getNode(text, index, isHashTagOrSpace);
          node = newNode;
          index = newIndex;
        }
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

export function getNodesWithPopulatedUserId(textNodes: TextNode[], userTag: string, userId: string) {
  return textNodes.map(textNode => {
    if (textNode.type === "@" && textNode.value === `@${userTag}`) {
      return {
        ...textNode,
        userId
      };
    }
    return textNode;
  })
}

export function getNodesWithPopulatedUserIds(textNodes: TextNode[], oldTextNodes: TextNode[]) {
  return textNodes.map(textNode => {
    const oldTextNode = oldTextNodes.find(oldTextNode => oldTextNode.type === "@" && oldTextNode.value === textNode.value) as UserTagNode;

    return oldTextNode ? { ...textNode, userId: oldTextNode.userId } : textNode;
  });
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
const isHashTagOrSpace = (char: string) => {
  return char === hashTagSymbol || char === ' ';
}
const isHashOrUserTag = (char: string) => {
  return char === hashTagSymbol || char === userTagSymbol;
}

export function matchFirstUserTagReverse(text: string) {
  let index = -1;
  for (let i = text.length - 1; i >= 0; i--) {
    if (text[i] === "#" || text[i] === ' ') {
      break;
    }
    if (text[i] === '@' && (i === 0 || (i > 0 && text[i - 1] === ' '))) {
      index = i;
      break;
    }
  }
  if (index === -1) {
    return "";
  }
  return text.substring(index, text.length);
}