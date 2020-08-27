export interface NotificationViewModel {
  id?: string;
  type: string;
  fromId: string;
  fromName: string;
  toId: string;
  toName: string;
  toDeviceId: string;
  postId?: string;
  postText?: string;
  commentId?: string;
  commentText?: string;
  notificationText?: string;
  seen?: boolean;
  etc?: any;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum NotificationType {
  SingleAddress = "single_address",
  MultiAddress = "multi_address",
  PostUpvote = "post_upvote",
  PostDownvote = "post_downvote",
  PostReact = "post_react",
  PostTag = "post_tag",
  CommentNew = "comment_new",
  CommentTag = "comment_tag",
}
