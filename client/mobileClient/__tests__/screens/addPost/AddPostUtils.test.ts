import { extractNodesFromInputText, hashTagSymbol } from "../../../src/screens/addPost/AddPostUtils";

it('text contains only hashtag', () => {
  const array= extractNodesFromInputText("#ako");

  expect(array.length).toBe(1);
  expect(array[0].value).toBe("#ako");
  expect(array[0].startIndex).toBe(0);
  expect(array[0].endIndex).toBe(3);
  expect(array[0].type).toBe("#");
});

it('text contains hashtag in the middle', () => {
  const array= extractNodesFromInputText("a#bc d");
  const elem1=array[0];
  const elem2=array[1];
  const elem3=array[2];
  expect(array.length).toBe(3);
  expect(elem1.value).toBe("a");
  expect(elem2.value).toBe("#bc");
  expect(elem3.value).toBe(" d");
});

it('(1 hashtag + 2 usertag)(without space) + plain text ', () => {
  const array= extractNodesFromInputText("#macs@ako@bubuta text");
  const elem1=array[0];
  const elem2=array[1];
  const elem3=array[2];
  const elem4=array[3];
  expect(array.length).toBe(4);
  expect(elem1.value).toBe("#macs");
  expect(elem2.value).toBe("@ako");
  expect(elem3.value).toBe("@bubuta");
  expect(elem4.value).toBe(" text");
});

it('2 hash tag with space', () => {
  const array= extractNodesFromInputText("#macs #ako");
  const elem1=array[0];
  const elem2=array[1];
  const elem3=array[2];
  expect(array.length).toBe(3);
  expect(elem1.value).toBe("#macs");
  expect(elem2.value).toBe(" ");
  expect(elem3.type).toBe(hashTagSymbol);
  expect(elem3.value).toBe("#ako");
});

it('plain text + splace + hash tag', () => {
  const array= extractNodesFromInputText("ako #sagamocdo");
  const elem1=array[0];
  const elem2=array[1];
  expect(array.length).toBe(2);
  expect(elem1.value).toBe("ako ");
  expect(elem2.value).toBe("#sagamocdo");
});