import {Publish, Publisher} from './Publisher';
import {Container, Inject, Service} from 'typedi';
import {NotificationPublisherSettings, RoutingSettings} from '../../message.queue/topology';
import {IPost} from '../../interface/Post';

@Service()
export class NotificationPublisher extends Publisher {
  constructor(@Inject('Rabbit') rabbitInstance,
      settings: RoutingSettings = NotificationPublisherSettings) {
    super(rabbitInstance, settings);
  }
}


class PostNotificationPublisher implements Publish {
  private readonly notificationPublisher: NotificationPublisher;
  private readonly post: IPost;
  private postTagNotification: PostTagNotification;
  private UserModel = Container.get('UserModel');
  constructor(post: IPost, notificationPublisher: NotificationPublisher) {
    this.post = post;
    this.notificationPublisher = notificationPublisher;
  }

  // private async stripPostNotification() {
  //   const
  //   this.postTagNotification = {
  //     type: NotificationType.Post,
  //     fromId: this.post.author,
  //     fromName: this.post.
  //   };
  // }

  publish(msg: any) {

  }
}
