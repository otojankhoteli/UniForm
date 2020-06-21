import { extractNodesFromInputText, getNodesWithPopulatedUserId, UserTagNode } from "../../../src/screens/addPost/AddPostUtils";

it('Update one item nodes array with user id', () => {
  const array = extractNodesFromInputText("@ako");
  const newArray = getNodesWithPopulatedUserId(array,"ako", "userId");
  const node:UserTagNode=newArray[0] as UserTagNode;
  
  expect(newArray.length).toBe(1);
  expect(node.value).toBe("@ako");
  expect(node.userId).toBe("userId");
});


it('Update nodes array with user id', () => {
  const array = extractNodesFromInputText("#ako random text @ako");
  const newArray = getNodesWithPopulatedUserId(array,"ako", "userId");
  const node:UserTagNode=newArray[2] as UserTagNode;
  
  expect(newArray.length).toBe(3);
  expect(node.value).toBe("@ako");
  expect(node.userId).toBe("userId");
});