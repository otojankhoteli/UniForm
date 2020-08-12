export enum PostNotification {
  Upvote = 'post_upvote',
  Downvote = 'post_downvote',
}

interface BaseNotification {
  type: string,
  from: {
    _id: string,
    name: string,
  },
  to: {
    _id: string,
    name: string,
    deviceId: string,
  },
  where: {
    _id: string,
    text?: string,
  },
  etc?: any,
}


interface PostTagNotification extends BaseNotification {}

export interface PostUpVoteNotification extends BaseNotification {
  type: PostNotification.Upvote,
}

export interface PostDownVoteNotification extends BaseNotification {
  type: PostNotification.Downvote,
}
