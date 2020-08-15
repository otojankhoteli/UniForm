import {Service, Inject} from 'typedi';
import {Document, Model} from 'mongoose';
import NotFoundError from '../util/error/NotFoundError';
import {INotification} from '../interface/Notification';


@Service()
export class NotificationService {
  constructor(
    @Inject('NotificationModel')
    private NotificationModel: Model<INotification & Document>,
  ) {
  }

  public async save(notification: INotification) {
    console.log('saving notification: ', notification);
    return this.NotificationModel.create(notification);
  }

  public async saveBulk(notifications: INotification[]) {
    return this.NotificationModel.insertMany(notifications);
  }
}
