import { matchFirstUserTagReverse } from "../../../src/screens/addPost/AddPostUtils";

it('successfully found match', () => {
  const text = matchFirstUserTagReverse("@user");

  expect(text).toBe("@user");
});

it('successfully found match (starts with space)', () => {
  const text = matchFirstUserTagReverse(" @user");

  expect(text).toBe("@user");
});

it('match not found (ends with space)', () => {
  const text = matchFirstUserTagReverse(" @user ");

  expect(text).toBe("");
});

it('match not found (ends with #)', () => {
  const text = matchFirstUserTagReverse(" @user#");

  expect(text).toBe("");
});

it('match not found', () => {
  const text = matchFirstUserTagReverse("@user randomtext");

  expect(text).toBe("");
});

it('successfully found match (starts with symbol space)', () => {
  const text = matchFirstUserTagReverse("user @user");

  expect(text).toBe("@user");
});