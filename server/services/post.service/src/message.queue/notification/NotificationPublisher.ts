import {Publisher} from '../Publisher';
import {NotificationPublisherSettings, RoutingSettings} from '../topology';
import {Logger} from 'winston';
import {Inject, Service} from 'typedi';
import {Document, Model} from 'mongoose';
import {IPost} from '../../interface/Post';
import {IUser} from '../../interface/User';
import {
  PostDownVoteNotification,
  NotificationType,
  PostTagNotification,
  PostUpVoteNotification,
} from '../../interface/Notification';
import {IComment} from '../../interface/Comment';


export class NotificationPublisher extends Publisher {
  constructor(rabbitInstance,
      settings: RoutingSettings = NotificationPublisherSettings) {
    super(rabbitInstance, settings);
  }
}


@Service()
export class PostNotificationPublisher {
  private postNotificationEnum = NotificationType;

  constructor(
    @Inject('NotificationPublisher')
    private readonly notificationPublisher: NotificationPublisher,
    @Inject('logger')
    private logger: Logger,
    @Inject('PostModel')
    private PostModel: Model<IPost & Document>,
    @Inject('UserModel')
    private UserModel: Model<IUser & Document>,
    @Inject('CommentModel')
    private CommentModel: Model<IComment & Document>) {}

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
    return this.publish({msg: result, type: this.postNotificationEnum.SingleAddress});
  }

  public async upVote({postId, upvoterId}) {
    return this._react({postId, reactorId: upvoterId, reaction: this.postNotificationEnum.PostUpvote});
  }

  public async downVote({postId, downvoterId}) {
    return this._react({postId, reactorId: downvoterId, reaction: this.postNotificationEnum.PostDownvote});
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
        type: this.postNotificationEnum.PostTag,
        from: post.author,
        to: post.userTags,
        where: {
          _id: post._id,
          text: post.text,
        },
      };

      return this.publish({msg: result, type: this.postNotificationEnum.MultiAddress});
    }
  }

  public async newComment(commentId) {
    const comment = await this.CommentModel
        .findById(commentId)
        .populate('author', ['name'])
        .populate('userTags', ['name', 'deviceId'])
        .populate({
          path: 'post',
          populate: {path: 'author', select: ['name', 'deviceId']},
        })
        .lean();

    const newCommentNotification = {
      type: this.postNotificationEnum.CommentNew,
      from: comment.author,
      to: comment.post.author,
      where: {
        _id: comment._id,
        text: comment.text,
      },
      etc: {
        postId: comment.post._id,
      },
    };
    await this.publish({msg: newCommentNotification, type: this.postNotificationEnum.SingleAddress});

    const commentTagsNotification = {
      type: this.postNotificationEnum.CommentTag,
      from: comment.author,
      to: comment.userTags,
      where: {
        _id: comment._id,
        text: comment.text,
      },
      etc: {
        postId: comment.post._id,
      },
    };

    await this.publish({msg: commentTagsNotification, type: this.postNotificationEnum.MultiAddress});
  }


  // public async commentOnPost()
}
