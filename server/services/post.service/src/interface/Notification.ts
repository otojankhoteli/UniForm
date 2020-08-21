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

interface From {
  _id: string,
  name: string,
}

interface To {
  _id: string,
  name: string,
  deviceId: string,
}

interface Where {
  _id: string,
  text?: string,
}

interface BaseNotification {
  type: string,
  from: From,
  to: To | To[],
  where: Where,
  etc?: any,
}


export interface PostUpVoteNotification extends BaseNotification {
  type: NotificationType.PostUpvote,
  to: To,
}

export interface PostDownVoteNotification extends BaseNotification {
  type: NotificationType.PostDownvote,
  to: To,
}

export interface PostTagNotification extends BaseNotification {
  type: NotificationType.PostTag,
  to: To[],
}
