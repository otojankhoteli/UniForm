interface BaseNotification {
  type: string,
  fromId: string,
  fromName: string,
  toId: string,
  toName: string,
  whereId: string,
  etc?: any,
}

interface PostTagNotification extends BaseNotification {}
