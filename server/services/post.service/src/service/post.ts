import {Service, Inject, Container} from 'typedi';
import {Document, Model} from 'mongoose';
import {IUser} from '../interface/User';
import NotFoundError from '../util/error/NotFoundError';
import {IPost} from '../interface/Post';
import {EventEmitter} from 'events';
import {Logger} from 'winston';
import {Events} from '../subscriber/event';
import {ICategoryDTO} from '../interface/Category';
import {IHashTag, IHashTagSearchModel} from '../interface/HashTag';
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

  private async _validateBeforeInsert(post: IPost) {
    const category = this.CategoryModel.findById(post.category);

    if (!category) {
      throw new NotFoundError(`Can not create post, category with id: ${post.category} does not exist`);
    }

    const user = this.UserModel.findById(post.author);

    if (!user) {
      throw new NotFoundError(`Can not create post, user with id: ${post.author} does not exist`);
    }

    if (post._id) {
      const existingPost = this.PostModel.findOne({_id: post._id, author: post.author});
      if (!existingPost) {
        throw new PermissionDeniedError('Permission denied: post doesn\'t belong to you');
      }
    }
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


    // const oldPost = await this.PostModel.findById(post._id);
    // if (oldPost) {
    //   // პოსტიდან ამოშლილი ჰეშთეგების პოვნა და ამ ჰეშთეგებიდან პოსტის ამოშლა
    //   const removedHashTags: string[] = _.difference(oldPost.hashTags, post.hashTags);
    //   for (const toRemove of removedHashTags) {
    //     await this.HashTagModel.updateOne(
    //         {name: toRemove},
    //         {$pullAll: {posts: [post._id]}});
    //   }
    // }
    //
    // const existingHashTags: any = await this.HashTagModel
    //     .find()
    //     .where('name')
    //     .in(post.hashTags);
    // const existingHashTagNames = existingHashTags.map((h) => h.name);
    //
    // const newHashTagNames = _.difference(post.hashTags, existingHashTagNames);
    //
    // const newHashTagObjects = newHashTagNames.map((newHashTagName) => {
    //   return {name: newHashTagName, posts: [post._id]};
    // });
    //
    // await this.HashTagModel.create(newHashTagObjects);
  }

  public async save(post: IPost) {
    this.logger.silly('creating new post %o', post);
    await this._validateBeforeInsert(post);

    let newPost;
    if (post._id) {
      newPost = await this.PostModel.findByIdAndUpdate(post._id, post, {new: true});
    } else {
      newPost = await this.PostModel.create(post);
    }

    await this._addHashTags(post.hashTags);

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
}
