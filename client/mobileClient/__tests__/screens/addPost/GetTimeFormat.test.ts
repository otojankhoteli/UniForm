import { getTimeFormat } from "../../../src/shared/Utils";

it('successfully returned format in minutes', () => {
  const format = getTimeFormat(new Date("2020-06-21T11:33:26.242Z"), new Date("2020-06-21T11:31:26.242Z"));
  
  expect(format).toBe("2m ago");
});

it('successfully returned format in minutes', () => {
  const format = getTimeFormat(new Date("2020-06-21T11:59:22.853Z"), new Date("2020-06-21T11:31:26.242Z"));
  
  expect(format).toBe("27m ago");
});


it('successfully returned format in hours', () => {
  const format = getTimeFormat(new Date("2020-06-21T14:33:26.242Z"), new Date("2020-06-21T11:34:26.242Z"));
  
  expect(format).toBe("2h ago");
});

it('successfully returned format in hours', () => {
  const format = getTimeFormat(new Date("2020-06-21T14:33:26.242Z"), new Date("2020-06-21T11:31:26.242Z"));
  
  expect(format).toBe("3h ago");
});