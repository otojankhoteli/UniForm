import {Publish, Publisher} from '../Publisher';
import {Container, Inject, Service} from 'typedi';
import {NotificationPublisherSettings, RoutingSettings} from '../topology';
import {IPost} from '../../interface/Post';

@Service()
export class NotificationPublisher extends Publisher {
  constructor(rabbitInstance,
      settings: RoutingSettings = NotificationPublisherSettings) {
    super(rabbitInstance, settings);
  }
}


class PostNotificationPublisher implements Publish {
  private readonly notificationPublisher: NotificationPublisher;
  private UserModel = Container.get('UserModel');
  constructor(notificationPublisher: NotificationPublisher) {
    this.notificationPublisher = notificationPublisher;
  }

  // private async stripPostNotification(post: IPost) {
  //   const
  // }

  publish(msg: any) {
    const notification = 1;

    return this.notificationPublisher.publish(notification);
  }
}
