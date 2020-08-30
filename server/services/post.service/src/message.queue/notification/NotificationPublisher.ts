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
  private notificationEnum = NotificationType;

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


  private async _postReact({postId, reactorId, reaction}) {
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
      postId: post._id,
      postText: post.text,
    };
    return this.publish({msg: result, type: this.notificationEnum.SingleAddress});
  }

  public async postUpVote({postId, upvoterId}) {
    return this._postReact({postId, reactorId: upvoterId, reaction: this.notificationEnum.PostUpvote});
  }

  public async postDownVote({postId, downvoterId}) {
    return this._postReact({postId, reactorId: downvoterId, reaction: this.notificationEnum.PostDownvote});
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
        type: this.notificationEnum.PostTag,
        from: post.author,
        to: post.userTags,
        postId: post._id,
        postText: post.text,
      };

      return this.publish({msg: result, type: this.notificationEnum.MultiAddress});
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
      type: this.notificationEnum.CommentNew,
      from: comment.author,
      to: comment.post.author,
      commentId: comment._id,
      commentText: comment.text,
      postId: comment.post._id,
    };
    await this.publish({msg: newCommentNotification, type: this.notificationEnum.SingleAddress});

    const commentTagsNotification = {
      type: this.notificationEnum.CommentTag,
      from: comment.author,
      to: comment.userTags,
      postId: comment.post._id,
      commentId: comment._id,
      commentText: comment.text,
    };

    await this.publish({msg: commentTagsNotification, type: this.notificationEnum.MultiAddress});
  }

  private async _commentReact({commentId, reactorId, reaction}) {
    const comment = await this.CommentModel
        .findById(commentId)
        .populate('author', ['name', 'imgUrl', 'deviceId'])
        .lean();

    const reactor = await this.UserModel.findById(reactorId).lean();

    const result = {
      type: reaction,
      from: {
        _id: reactor._id,
        name: reactor.name,
      },
      to: comment.author,
      postId: comment.post._id,
      commentId: comment._id,
      commentText: comment.text,
    };
    return this.publish({msg: result, type: this.notificationEnum.SingleAddress});
  }

  async commentUpVote({commentId, upvoterId}) {
    return this._commentReact({commentId, reactorId: upvoterId, reaction: this.notificationEnum.CommentUpvote});
  }

  async commentDownVote({commentId, downvoterId}) {
    return this._commentReact({commentId, reactorId: downvoterId, reaction: this.notificationEnum.CommentDownvote});
  }
}
