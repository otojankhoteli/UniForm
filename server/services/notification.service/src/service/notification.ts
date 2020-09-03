import {Service, Inject} from 'typedi';
import {Document, Model} from 'mongoose';
import NotFoundError from '../util/error/NotFoundError';
import {NotificationViewModel} from '../interface/Notification';


@Service()
export class NotificationService {
  constructor(
    @Inject('NotificationModel')
    private NotificationModel: Model<NotificationViewModel & Document>,
  ) {
  }

  public async save(notification: NotificationViewModel) {
    console.log('saving notification: ', notification);
    return this.NotificationModel.create(notification);
  }

  public async saveBulk(notifications: NotificationViewModel[]) {
    return this.NotificationModel.insertMany(notifications);
  }

  public async getNotificationsOf(currentUser: string, skip = 0, limit = 10) {
    const result = await this.NotificationModel
        .find()
        .where('toId')
        .equals(currentUser)
        .skip(skip)
        .limit(limit)
        .sort({createdAt: 'desc'})
        .lean();
    const ids = result.map((e) => {
      return e._id;
    });
    await this.NotificationModel.updateMany({_id: {$in: ids}}, {seen: true});
    return result.map<NotificationViewModel>(NotificationService.toViewModel);
  }

  private static toViewModel(e) {
    return {
      id: e._id,
      type: e.type,
      fromId: e.fromId,
      fromName: e.fromName,
      toId: e.toId,
      toName: e.toName,
      toDeviceId: e.toDeviceId,
      notificationText: e.notificationText,
      seen: e.seen,
      etc: e.etc,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
      postId: e.postId,
      postText: e.postText,
      commentId: e.commentId,
      commentText: e.commentText,
    };
  }
}

