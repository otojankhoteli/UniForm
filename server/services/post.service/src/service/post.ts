import {Service, Inject, Container} from 'typedi';
import {Document, Model} from 'mongoose';
import {IUser} from '../interface/User';
import NotFoundError from '../util/error/NotFoundError';
import {IPost, UpsertPostRequest} from '../interface/Post';
import {EventEmitter} from 'events';
import {Logger} from 'winston';
import {Events} from '../subscriber/event';
import {ICategoryDTO} from '../interface/Category';
import {IHashTag, IHashTagSearchModel} from '../interface/HashTag';
import mongoose from 'mongoose';
import _ from 'lodash';
import PermissionDeniedError from '../util/error/PermissionDeniedError';

@Service()
export class PostService {
  private readonly skip = 0;
  private readonly limit = 10;

  constructor(
      @Inject('PostModel')
      private PostModel: Model<IPost & Document>,
      @Inject('CategoryModel')
      private CategoryModel: Model<ICategoryDTO & Document>,
      @Inject('UserModel')
      private UserModel: Model<IUser & Document>,
      @Inject('HashTagModel')
      private HashTagModel: Model<IHashTag & Document>,
      @Inject('EventEmitter')
      private eventEmitter: EventEmitter,
      @Inject('logger')
      private logger: Logger,
  ) {
  }

  // private async _validateUser(userId) {
  //   const user = this.UserModel.findById(user);
  //
  //   if (!user) {
  //     throw new NotFoundError(`Can not create post, user with id: ${post.authorId} does not exist`);
  //   }
  // }

  private async _validateBeforeInsert(post: UpsertPostRequest) {
    const category = this.CategoryModel.findById(post.categoryId);

    if (!category) {
      throw new NotFoundError(`Can not create post, category with id: ${post.categoryId} does not exist`);
    }

    const user = this.UserModel.findById(post.authorId);

    if (!user) {
      throw new NotFoundError(`Can not create post, user with id: ${post.authorId} does not exist`);
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
          return {name};
        });

    return this.HashTagModel.insertMany(newHashTags);
  }

  public async save(upsertPostRequest: UpsertPostRequest) {
    this.logger.silly('creating new post %o', upsertPostRequest);
    await this._validateBeforeInsert(upsertPostRequest);

    let newPost: IPost = {
      _id: upsertPostRequest.id,
      author: upsertPostRequest.authorId,
      category: upsertPostRequest.categoryId,
      text: upsertPostRequest.text,
      type: 'test',
      files: upsertPostRequest.files,
      hashTags: upsertPostRequest.hashTags,
      userTags: upsertPostRequest.userTags,
      upVoters: [], // fixme
      downVoters: [],
      voteCount: 0,
    };
    if (newPost._id) {
      newPost = await this.PostModel.findByIdAndUpdate(newPost._id, newPost, {new: true});
    } else {
      newPost = await this.PostModel.create(newPost);
    }

    await this._addHashTags(newPost.hashTags);

    this.eventEmitter.emit(Events.post.new, newPost);

    return newPost;
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

  public async getCategoryPosts({categoryId, skip, limit}) {
    this.logger.silly('getting posts from category: %o', categoryId);
    if (!skip) skip = this.skip;
    if (!limit) limit = this.limit;

    return this.PostModel
        .find()
        .where('category')
        .equals(categoryId)
        .skip(skip)
        .limit(limit);
  }

  private async _validateVoteAndGetPost(postId, userId) {
    const post = await this.PostModel.findById(postId);
    const user = await this.UserModel.findById(userId);

    if (!post) {
      throw new NotFoundError(`can not upvote, post with id: ${postId} does not exist`);
    }

    if (!user) {
      // throw new NotFoundError(`can not upvote, user with id: ${userId} does not exist`);
    }
    return post;
  }

  public async upVote(postId: string, userId: string) {
    const post = await this._validateVoteAndGetPost(postId, userId);

    const hasUpvoted = await this.PostModel.findOne({_id: postId, upVoters: userId}).lean();

    const hasDownVoted = await this.PostModel.findOne({_id: postId, downVoters: userId}).lean();

    if (hasUpvoted) {
      post.upVoters = post.upVoters.filter((upVoter) => upVoter.toString() !== userId);
      post.voteCount--;
    } else if (hasDownVoted) {
      post.downVoters = post.downVoters.filter((downVoter) => downVoter.toString() !== userId);
      post.upVoters.push(userId);
      post.voteCount += 2;
    } else {
      post.upVoters.push(userId);
      post.voteCount++;
    }
    return this.PostModel.findByIdAndUpdate(postId, post, {new: true});
  }

  public async downVote(postId: string, userId: string) {
    const post = await this._validateVoteAndGetPost(postId, userId);

    const hasUpvoted = await this.PostModel.findOne({_id: postId, upVoters: userId});

    const hasDownVoted = await this.PostModel.findOne({_id: postId, downVoters: userId});

    if (hasDownVoted) {
      post.downVoters = post.downVoters.filter((downVoter) => downVoter.toString() !== userId);
      post.voteCount++;
    } else if (hasUpvoted) {
      post.upVoters = post.upVoters.filter((upVoter) => upVoter.toString() !== userId);
      post.downVoters.push(userId);
      post.voteCount -= 2;
    } else {
      post.downVoters.push(userId);
      post.voteCount--;
    }
    return this.PostModel.findByIdAndUpdate(postId, post, {new: true});
  }

  public async filterUpVoted(postIds: string[], userId: string) {
    const transIds = postIds.filter((e) => mongoose.Types.ObjectId(e));
    return this.PostModel
        .find()
        .where('_id')
        .in(transIds)
        .where('upVoters')
        .equals(userId)
        .select('_id');
  }
}
