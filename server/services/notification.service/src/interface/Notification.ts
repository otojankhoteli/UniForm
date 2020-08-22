export enum NotificationType {
  SingleAddress = 'single_address',
  MultiAddress = 'multi_address',
  PostUpvote = 'post_upvote',
  PostDownvote = 'post_downvote',
  PostReact = 'post_react',
  PostTag = 'post_tag',
  CommentNew = 'comment_new',
  CommentTag = 'comment_tag',
}

export interface NotificationViewModel {
  id?: string,
  type: string,
  fromId: string,
  fromName: string,
  toId: string,
  toName: string,
  toDeviceId: string,
  whereId: string,
  whereText?: string,
  notificationText?: string,
  seen?: boolean,
  etc?: any,
  createdAt?: Date,
  updatedAt?: Date,
}

interface CommentNotificationViewModel extends NotificationViewModel {
  etc: {
    postId: string,
  }
}

interface To {
  _id: string,
  name: string,
  deviceId: string,
}

interface PostServiceNotification {
  _id: string,
  type: string,
  from: {
    _id: string,
    name: string,
  },
  where: {
    _id: string,
    text?: string,
  },
  etc?: any,
}

export interface SingleAddressNotification extends PostServiceNotification {
  to: To,
}

export interface MultiAddressNotification extends PostServiceNotification {
  to: To[],
}
