import { Service, Inject } from 'typedi';
import { Document, Model } from 'mongoose';
import { IUser } from '../interface/User';
import NotFoundError from '../util/error/NotFoundError';
import { IPost, UpsertPostRequest } from '../interface/Post';
import { EventEmitter } from 'events';
import { Logger } from 'winston';
import { Events } from '../subscriber/event';
import { IHashTag, IHashTagSearchModel } from '../interface/HashTag';
import _ from 'lodash';
import { VoteService } from './vote';
import { IComment, UpsertCommentRequest } from '../interface/Comment';

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

  // private async _validateUser(userId) {
  //   const user = this.UserModel.findById(user);
  //
  //   if (!user) {
  //     throw new NotFoundError(`Can not create post, user with id: ${post.authorId} does not exist`);
  //   }
  // }

  private async _validateBeforeInsert(comment: UpsertCommentRequest) {
    const category = this.PostModel.findById(comment.postId);
    if (!category) {
      throw new NotFoundError(`Can not write comment, on post with id: ${comment.postId} does not exist`);
    }

    const user = this.UserModel.findById(comment.authorId);
    if (!user) {
      throw new NotFoundError(`Can not write comment, user with id: ${comment.authorId} does not exist`);
    }

    // ToDo check if use case exists
    // if (post._id) {
    //   const existingPost = this.PostModel.findOne({_id: post._id, author: post.author});
    //   if (!existingPost) {
    //     throw new PermissionDeniedError('Permission denied: post doesn\'t belong to you');
    //   }
    // }
  }

  private async _addHashTags(hashTags: string[]) {
    hashTags = [].concat(hashTags);

    const existingHashTags = await this.HashTagModel
      .find()
      .where('name')
      .in(hashTags);

    const existingHashTagNames = [].concat(existingHashTags).map((tag) => tag.name);
    console.log(existingHashTagNames);
    const newHashTags = hashTags
      .filter((name) => !existingHashTagNames.includes(name))
      .map((name) => {
        return { name };
      });

    return this.HashTagModel.insertMany(newHashTags);
  }

  public async save(upsertCommentRequest: UpsertCommentRequest): Promise<IComment> {
    this.logger.silly('creating new comment %o', upsertCommentRequest);
    await this._validateBeforeInsert(upsertCommentRequest);

    let newComment: IComment = {
      _id: upsertCommentRequest.id,
      author: upsertCommentRequest.authorId,
      text: upsertCommentRequest.text,
      type: 'test',
      files: upsertCommentRequest.files,
      userTags: upsertCommentRequest.userTags,
      upVoters: [], // fixme
      downVoters: [],
      voteCount: 0,
    };

    if (newComment._id) {
      newComment = await this.CommentModel.findByIdAndUpdate(newComment._id, newComment, { new: true });
    } else {
      newComment = await this.CommentModel.create(newComment);
    }

    // await this._addHashTags(newComment.hashTags); TODO write addUserTags

    this.eventEmitter.emit(Events.comment.new, newComment);//TODO change to comment

    return newComment;
  }

  public async getHashTags(query: IHashTagSearchModel) {
    this.logger.silly('getting hashtags: %o', query);

    if (!query.skip) query.skip = this.skip;
    if (!query.limit) query.limit = this.limit;

    return this.HashTagModel
      .find()
      .where('name')
      .regex(new RegExp(`^${query.name}`))
      .skip(query.skip)
      .limit(query.limit);
  }

  public async getPostComments({ postId, skip, limit }) {
    this.logger.silly('getting comments from post: %o', postId);
    if (!skip) skip = this.skip;
    if (!limit) limit = this.limit;

    return this.PostModel
      .find()
      .where('post')
      .equals(postId)
      .skip(skip)
      .limit(limit);
  }

  private async _validateVoteAndGetComment(commentId, userId) {
    const comment = await this.CommentModel.findById(commentId);
    const user = await this.UserModel.findById(userId);

    if (!comment) {
      throw new NotFoundError(`can not upvote, comment with id: ${commentId} does not exist`);
    }

    if (!user) {
      // throw new NotFoundError(`can not upvote, user with id: ${userId} does not exist`);
    }
    return comment;
  }

  public async upVote(commentId: string, userId: string) {
    const post = await this._validateVoteAndGetComment(commentId, userId);
    return this.VoteService.upVote(userId, post);
  }

  public async downVote(commentId: string, userId: string) {
    const comment = await this._validateVoteAndGetComment(commentId, userId);
    return this.VoteService.downVote(userId, comment);
  }
}
