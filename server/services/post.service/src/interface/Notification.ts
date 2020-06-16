enum NotificationType {
  Post = 'POST',
  Comment = 'COMMENT',
}

interface BaseNotification {
  type: NotificationType,
  fromId: string,
  fromName: string,
  toId: string,
  toName: string,
  // whereId: string,
  etc?: any,
}

interface PostTagNotification extends BaseNotification {}
