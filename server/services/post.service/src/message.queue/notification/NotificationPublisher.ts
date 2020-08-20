import {Publisher} from '../Publisher';
import {NotificationPublisherSettings, RoutingSettings} from '../topology';
import {Logger} from 'winston';
import {Inject, Service} from 'typedi';
import {Document, Model} from 'mongoose';
import {IPost} from '../../interface/Post';
import {IUser} from '../../interface/User';
import {
  PostDownVoteNotification,
  PostNotification,
  PostTagNotification,
  PostUpVoteNotification
} from '../../interface/Notification';


export class NotificationPublisher extends Publisher {
  constructor(rabbitInstance,
      settings: RoutingSettings = NotificationPublisherSettings) {
    super(rabbitInstance, settings);
  }
}


@Service()
export class PostNotificationPublisher {
  private postNotificationEnum = PostNotification;

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

  private publish({msg, type}) {
    return this.notificationPublisher.publish({msg, type});
  }


  private async _react({postId, reactorId, reaction}) {
    this.logger.silly('sending upvote notification');

    const post = await this.PostModel
        .findById(postId)
        .populate('author', ['name', 'imgUrl', 'deviceId'])
        .lean();

    const reactor = await this.UserModel.findById(reactorId).lean();

    const result = {
      type: reaction,
      from: {
        _id: reactor._id,
        name: reactor.name,
      },
      to: post.author,
      where: {
        _id: post._id,
        text: post.text,
      },
    };
    return this.publish({msg: result, type: this.postNotificationEnum.React});
  }

  public async upVote({postId, upvoterId}) {
    return this._react({postId, reactorId: upvoterId, reaction: this.postNotificationEnum.Upvote});
  }

  public async downVote({postId, downvoterId}) {
    return this._react({postId, reactorId: downvoterId, reaction: this.postNotificationEnum.Downvote});
  }

  public async postTag(postId: string) {
    const post: IPost = await this.PostModel
        .findById(postId)
        .populate('author', ['name', 'imgUrl', 'deviceId'])
        .populate('userTags', ['name', 'imgUrl', 'deviceId'])
        .populate('category', ['name'])
        .lean();


    if (post.userTags.length) {
      const result: PostTagNotification = {
        type: this.postNotificationEnum.Tag,
        from: post.author,
        to: post.userTags,
        where: {
          _id: post._id,
          text: post.text,
        },
      };

      return this.publish({msg: result, type: this.postNotificationEnum.Tag});
    }
  }
}
