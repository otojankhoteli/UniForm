export enum PostNotification {
  Upvote = 'post_upvote',
  Downvote = 'post_downvote',
  React = 'post_react',
  Tag = 'post_tag',
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
  whereText: string,
  notificationText?: string,
  seen?: boolean,
  etc?: any,
  createdAt?: Date,
  updatedAt?: Date,
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
