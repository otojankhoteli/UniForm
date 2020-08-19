export interface NotificationViewModel {
  type: NotificationType;
  id: string;
  text: string;
  fromId: string;
  fromName: string;
  fromProfilePictureUri: string;
  whereId: string;
  etc?: any;
}

export enum NotificationType {
  Post = "POST",
  Comment = "COMMENT",
}
