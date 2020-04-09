export function findFirst(text: string, array: string[], startPosition: number): number {
  for (let index = startPosition; index < text.length; index++) {
    if (!array.every(item => item !== text.charAt(index))) {
      return index;
    }
  }
  return startPosition;
}