export function findFirst(text: string, array: string[], startPosition: number): number {
  for (let index = startPosition; index < text.length; index++) {
    if (!array.every(item => item !== text.charAt(index))) {
      return index;
    }
  }
  return startPosition;
}

export function getTimeFormat(comparableDate: Date, createdAt: Date) {
  const diffInMinutes = ((comparableDate as any) - (createdAt as any)) / 60000;

  if (diffInMinutes / 60 < 1) {
    return `${Math.floor(diffInMinutes)}m ago`
  }

  if (diffInMinutes / (24 * 60) < 1) {
    return `${Math.floor(diffInMinutes / 60)}h ago`
  }

  if (diffInMinutes / (24 * 60 * 30) < 1) {
    return `${Math.floor(diffInMinutes / (60 * 24))}d ago`
  }

  if (diffInMinutes / (24 * 60 * 30 * 12) < 1) {
    return `${Math.floor(diffInMinutes / (60 * 24 * 30))}month ago`
  }

  return `${Math.floor(diffInMinutes / (60 * 24 * 30 * 12))}y ago`
}
