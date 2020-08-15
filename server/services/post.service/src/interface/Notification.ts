export enum PostNotification {
  Upvote = 'post_upvote',
  Downvote = 'post_downvote',
  React = 'post_react',
  Tag = 'post_tag',
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
  type: PostNotification.Upvote,
  to: To,
}

export interface PostDownVoteNotification extends BaseNotification {
  type: PostNotification.Downvote,
  to: To,
}

export interface PostTagNotification extends BaseNotification {
  type: PostNotification.Tag,
  to: To[],
}
