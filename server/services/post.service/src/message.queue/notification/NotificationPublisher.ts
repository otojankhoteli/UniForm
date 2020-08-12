import {Publisher} from '../Publisher';
import {NotificationPublisherSettings, RoutingSettings} from '../topology';
import {Logger} from 'winston';
import {Inject, Service} from 'typedi';
import {Document, Model} from 'mongoose';
import {IPost} from '../../interface/Post';
import {IUser} from '../../interface/User';
import {PostNotification, PostUpVoteNotification} from '../../interface/Notification';


export class NotificationPublisher extends Publisher {
  constructor(rabbitInstance,
      settings: RoutingSettings = NotificationPublisherSettings) {
    super(rabbitInstance, settings);
  }
}


@Service()
export class PostNotificationPublisher {
  constructor(
              @Inject('NotificationPublisher')
              private readonly notificationPublisher: NotificationPublisher,
              @Inject('logger')
              private logger: Logger,
              @Inject('PostModel')
              private PostModel: Model<IPost & Document>,
              @Inject('UserModel')
              private UserModel: Model<IUser & Document>) {
  }

  private publish(msg: any) {
    return this.notificationPublisher.publish(msg);
  }


  private async _react({postId, reactorId, reaction}) {
    this.logger.silly('sending upvote notification');

    const post = await this.PostModel
        .findById(postId)
        .populate('author', ['name', 'imgUrl', 'deviceId'])
        .lean();

    const reactor = await this.UserModel.findById(reactorId).lean();

    const result: PostUpVoteNotification = {
      type: reaction,
      from: {
        _id: reactor._id,
        name: reactor.name,
      },
      to: {
        _id: post.author._id,
        name: post.author.name,
        deviceId: post.author.deviceId,
      },
      where: {
        _id: post._id,
        text: post.text,
      },
    };
    return this.publish(result);
  }

  public async upVote({postId, upvoterId}) {
    return this._react({postId, reactorId: upvoterId, reaction: PostNotification.Upvote});
  }

  public async downVote({postId, downvoterId}) {
    return this._react({postId, reactorId: downvoterId, reaction: PostNotification.Downvote});
  }
}
