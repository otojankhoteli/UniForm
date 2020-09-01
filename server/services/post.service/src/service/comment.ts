import {Service, Inject} from 'typedi';
import {Document, Model} from 'mongoose';
import {IUser} from '../interface/User';
import NotFoundError from '../util/error/NotFoundError';
import {IPost, PostResponse, UpsertPostRequest} from '../interface/Post';
import {EventEmitter} from 'events';
import {Logger} from 'winston';
import {Events} from '../subscriber/event';
import {IHashTag, IHashTagSearchModel} from '../interface/HashTag';
import {VoteService} from './vote';
import {CommentResponse, IComment, UpsertCommentRequest} from '../interface/Comment';
import PermissionDeniedError from '../util/error/PermissionDeniedError';

@Service()
export class CommentService {
  private readonly skip = 0;
  private readonly limit = 10;

  constructor(
    @Inject('PostModel')
    private PostModel: Model<IPost & Document>,
    @Inject('CommentModel')
    private CommentModel: Model<IComment & Document>,
    @Inject('UserModel')
    private UserModel: Model<IUser & Document>,
    @Inject('HashTagModel')
    private HashTagModel: Model<IHashTag & Document>,
    @Inject('EventEmitter')
    private eventEmitter: EventEmitter,
    @Inject('logger')
    private logger: Logger,
    @Inject('CommentVoteService')
    private VoteService: VoteService,
  ) {
  }


  private async _validateBeforeInsert(comment: UpsertCommentRequest) {
    const post = await this.PostModel.findById(comment.postId);
    if (!post) {
      throw new NotFoundError(`Can not write comment, post with id: '${comment.postId}' does not exist`);
    }

    if (comment.id) {
      const existingPost = await this.CommentModel.findOne({_id: comment.id, author: comment.authorId});
      if (!existingPost) {
        throw new PermissionDeniedError('Permission denied: comment doesn\'t belong to you');
      }
    }
  }


  public async save(upsertCommentRequest: UpsertCommentRequest): Promise<IComment & any> {
    this.logger.silly('creating new comment %o', upsertCommentRequest);
    await this._validateBeforeInsert(upsertCommentRequest);

    const newComment = {
      ...upsertCommentRequest,
      author: upsertCommentRequest.authorId,
      post: upsertCommentRequest.postId,
    };

    const result = await this.CommentModel.create(newComment);

    this.eventEmitter.emit(Events.comment.new, result._id);

    return result;
  }


  public async update(upsertCommentRequest: UpsertCommentRequest): Promise<IComment & any> {
    this.logger.silly('updating comment %o', upsertCommentRequest);
    await this._validateBeforeInsert(upsertCommentRequest);

    const newComment = {
      ...upsertCommentRequest,
      author: upsertCommentRequest.authorId,
      post: upsertCommentRequest.postId,
    };

    const result = await this.CommentModel.findByIdAndUpdate(newComment.id, newComment, {
      upsert: true,
      new: true,
    }).lean();

    this.eventEmitter.emit(Events.comment.new, newComment);

    return result;
  }

  public async getCommentById(commentId, userId) {
    const result = await this.CommentModel
        .findById(commentId)
        .populate('author', ['name', 'imgUrl'])
        .populate('userTags', ['name', 'imgUrl'])
        .lean();
    return this.commentResponse(result, userId);
  }

  public async getPostComments({userId, postId, skip, limit}) {
    this.logger.silly('getting comments of post: %o', postId);
    if (!skip) skip = this.skip;
    if (!limit) limit = this.limit;

    const result = await this.CommentModel
        .find()
        .where('post')
        .equals(postId)
        .populate('author', ['name', 'imgUrl'])
        .populate('userTags', ['name', 'imgUrl'])
        .sort({updatedAt: 'desc'})
        .skip(skip)
        .limit(limit)
        .lean();
    return this.commentResponse(result, userId);
  }

  private async _validateVoteAndGetComment(commentId) {
    const comment = await this.CommentModel.findById(commentId);

    if (!comment) {
      throw new NotFoundError(`can not upvote, comment with id: ${commentId} does not exist`);
    }

    return comment;
  }

  public async upVote(commentId: string, userId: string) {
    const comment = await this._validateVoteAndGetComment(commentId);
    const result = await this.VoteService.upVote(userId, comment);
    this.eventEmitter.emit(Events.comment.upvote, {commentId, upvoterId: userId});
    return result;
  }

  public async downVote(commentId: string, userId: string) {
    const comment = await this._validateVoteAndGetComment(commentId);
    const result = await this.VoteService.downVote(userId, comment);
    this.eventEmitter.emit(Events.comment.downVote, {commentId, downvoterId: userId});
    return result;
  }

  async unReact(commentId: any, userId: string) {
    const comment = await this._validateVoteAndGetComment(commentId);
    return await this.VoteService.unReact(userId, comment);
  }

  private async commentResponse(comments: IComment[] | IComment, userId: string) {
    comments = [].concat(comments);
    const commentIds = comments.map((post) => post._id.toString());

    const upVotedPosts = (await this.filterReactedComments(commentIds, userId, 'upvote'))
        .map((comment) => comment._id.toString());
    const downVotedPosts = (await this.filterReactedComments(commentIds, userId, 'downvote'))
        .map((comment) => comment._id.toString());

    const commentsWithReacts = comments.map((comment) => {
      const commentId = comment._id.toString();
      const isUpvoted = upVotedPosts.includes(commentId);
      const isDownvoted = downVotedPosts.includes(commentId);

      const result: CommentResponse = {
        id: comment._id.toString(),
        text: comment.text,
        authorId: comment.author._id.toString(),
        authorUsername: comment.author.name,
        authorProfilePic: comment.author.imgUrl,
        voteCount: comment.voteCount,
        userTags: comment.userTags,
        isUpvoted: isUpvoted,
        isDownvoted: isDownvoted,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
      };
      return result;
    });
    return commentsWithReacts;
  }

  public async filterReactedComments(commentIds: string[], userId: string, reaction: 'upvote' | 'downvote') {
    let modelReaction;
    if (reaction === 'upvote') {
      modelReaction = 'upVoters';
    } else if (reaction === 'downvote') {
      modelReaction = 'downVoters';
    }
    return this.CommentModel
        .find()
        .where('_id')
        .in(commentIds)
        .where(modelReaction)
        .equals(userId)
        .select('_id')
        .lean();
  }

  public async getCommentsOf({userId, skip = this.skip, limit = this.limit}): Promise<CommentResponse[]> {
    const result = await this.CommentModel
        .find()
        .where('author')
        .equals(userId)
        .populate('author', ['name', 'imgUrl'])
        .populate('userTags', ['name', 'imgUrl'])
        .sort({updatedAt: 'desc'})
        .skip(skip)
        .limit(limit)
        .lean();
    return this.commentResponse(result, userId);
  }
}
