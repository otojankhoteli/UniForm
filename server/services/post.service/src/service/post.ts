import {Service, Inject} from 'typedi';
import {Document, Model} from 'mongoose';
import {IUser} from '../interface/User';
import NotFoundError from '../util/error/NotFoundError';
import {
  PostResponse,
  IPost,
  PostSearch,
  UpsertPostRequest,
} from '../interface/Post';
import {EventEmitter} from 'events';
import {Logger} from 'winston';
import {Events} from '../subscriber/event';
import {ICategoryDTO} from '../interface/Category';
import {IHashTag, IHashTagSearchModel} from '../interface/HashTag';
import {VoteService} from './vote';
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
    @Inject('PostVoteService')
    private VoteService: VoteService,
  ) {
  }

  private async postResponse(posts: IPost[] | IPost, userId: string) {
    posts = [].concat(posts);
    const postIds = posts.map((post) => post._id.toString());

    const upVotedPosts = (await this.filterReactedPosts(postIds, userId, 'upvote'))
        .map((post) => post._id.toString());
    const downVotedPosts = (await this.filterReactedPosts(postIds, userId, 'downvote'))
        .map((post) => post._id.toString());

    const postsWithReacts = posts.map((post) => {
      const postId = post._id.toString();
      const isUpvoted = upVotedPosts.includes(postId);
      const isDownvoted = downVotedPosts.includes(postId);

      const resp: PostResponse = {
        id: post._id.toString(),
        text: post.text,
        authorId: post.author._id.toString(),
        authorUsername: post.author.name,
        authorProfilePic: post.author.imgUrl,
        voteCount: post.voteCount,
        categoryId: post.category._id.toString(),
        userTags: post.userTags,
        categoryName: post.category.name,
        isUpvoted: isUpvoted,
        isDownvoted: isDownvoted,
        createdAt: post.createdAt,
        files: post.files,
        commentCount: post.commentCount,
      };
      return resp;
    });
    return postsWithReacts;
  }

  private async _validateBeforeInsert(post: UpsertPostRequest) {
    const category = await this.CategoryModel.findById(post.categoryId);

    if (!category) {
      throw new NotFoundError(`Can not create post, category with id: ${post.categoryId} does not exist`);
    }

    // ToDo check if use case exists
    if (post.id) {
      const existingPost = await this.PostModel.findOne({_id: post.id, author: post.authorId});
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
    const newHashTags = hashTags
        .filter((name) => !existingHashTagNames.includes(name))
        .map((name) => {
          return {name};
        });

    return this.HashTagModel.insertMany(newHashTags);
  }

  public async save(upsertPostRequest: UpsertPostRequest): Promise<IPost & any> {
    this.logger.silly('creating new post %o', upsertPostRequest);
    await this._validateBeforeInsert(upsertPostRequest);

    const newPost = {
      ...upsertPostRequest,
      category: upsertPostRequest.categoryId,
      author: upsertPostRequest.authorId,
      type: 'test',
    };

    const result = await this.PostModel.create(newPost);

    await this.CategoryModel
        .findByIdAndUpdate(upsertPostRequest.categoryId, {$inc: {postCount: 1}});

    await this._addHashTags(result.hashTags);


    this.eventEmitter.emit(Events.post.new, result._id.toString());

    return result;
  }

  public async update(upsertPostRequest: UpsertPostRequest): Promise<IPost & any> {
    this.logger.silly('updating post %o', upsertPostRequest);
    await this._validateBeforeInsert(upsertPostRequest);

    const newPost = {
      ...upsertPostRequest,
      category: upsertPostRequest.categoryId,
      author: upsertPostRequest.authorId,
      type: 'test',
    };

    const result = await this.PostModel.findByIdAndUpdate(newPost.id, newPost, {upsert: true, new: true});

    // @ts-ignore
    await this._addHashTags(result.hashTags);

    this.eventEmitter.emit(Events.post.update, result);

    return result;
  }


  public async getHashTags(query: IHashTagSearchModel) {
    this.logger.silly('getting hashtags: %o', query);

    if (!query.skip) query.skip = this.skip;
    if (!query.limit) query.limit = this.limit;

    const regex = new RegExp(`^${query.name}`);
    const conditions = query.name ? {name: {$regex: regex}} : {};

    const result = await this.HashTagModel
        .find(conditions)
        .skip(query.skip)
        .limit(query.limit);

    return result.map((hashtag) => {
      return {name: hashtag.name};
    });
  }

  public async getCategoryPosts({categoryId, userId, skip, limit}) {
    this.logger.silly('getting posts from category: %o', categoryId);
    if (!skip) skip = this.skip;
    if (!limit) limit = this.limit;

    const posts = await this.PostModel
        .find()
        .where('category')
        .populate('author', ['role', 'imgUrl', 'name', 'email'])
        .populate('category', 'name')
        .equals(categoryId)
        .skip(skip)
        .limit(limit);

    return this.postResponse(posts, userId);
  }

  private async _validateVoteAndGetPost(postId) {
    const post = await this.PostModel.findById(postId);

    if (!post) {
      throw new NotFoundError(`can not upvote, post with id: ${postId} does not exist`);
    }

    return post;
  }

  public async upVote(postId: string, userId: string) {
    const post = await this._validateVoteAndGetPost(postId);
    const result = await this.VoteService.upVote(userId, post);
    this.eventEmitter.emit(Events.post.upvote, {postId, upvoterId: userId});
    return result;
  }

  public async downVote(postId: string, userId: string) {
    const post = await this._validateVoteAndGetPost(postId);
    const result = await this.VoteService.downVote(userId, post);
    this.eventEmitter.emit(Events.post.downVote, {postId, downvoterId: userId});
    return result;
  }

  public async unReact(postId: string, userId: string) {
    const post = await this._validateVoteAndGetPost(postId);
    const result = await this.VoteService.unReact(userId, post);
    return result;
  }

  public async filterReactedPosts(postIds: string[], userId: string, reaction: 'upvote' | 'downvote') {
    let modelReaction;
    if (reaction === 'upvote') {
      modelReaction = 'upVoters';
    } else if (reaction === 'downvote') {
      modelReaction = 'downVoters';
    }
    return this.PostModel
        .find()
        .where('_id')
        .in(postIds)
        .where(modelReaction)
        .equals(userId)
        .select('_id')
        .lean();
  }

  public async getFeed(userId: string, skip, limit): Promise<PostResponse[]> {
    const posts = await this.getRawFeed(userId, skip, limit);
    return this.postResponse(posts, userId);
  }

  private async getRawFeed(userId: string, skip, limit): Promise<IPost[]> {
    // const subscribedCategories = (await this.UserModel.findById(userId).select('subscribedCategories')).subscribedCategories;

    return this.PostModel
        .find()
        .where('category')
        .populate('userTags', ['name', 'imgUrl'])
        .populate('author', ['name', 'imgUrl'])
        .populate('category', 'name')
    // .in(subscribedCategories)
        .sort({updatedAt: 'desc'})
        .skip(skip)
        .limit(limit)
        .lean();
  }


  public async getPostById(postId: string, userId: string): Promise<PostResponse> {
    return (await this.postResponse(await this.PostModel.findById(postId)
        .populate('author', ['name', 'imgUrl'])
        .populate('category', 'name')
        .populate('userTags', ['name', 'imgUrl'])
        .lean(), userId))[0];
  }

  private getPageParams(query) {
    return {
      skip: query.skip ?? this.skip,
      limit: query.limit ?? this.limit,
    };
  }

  private static page({docs, skip, limit, total}) {
    return {
      docs,
      skip,
      limit,
      total,
    };
  }

  public async searchPost(search: PostSearch): Promise<PostResponse[]> {
    const {skip, limit} = this.getPageParams(search);
    const condition = search.text ? {$text: {$search: search.text}} : {};
    const result = await this.PostModel.find(condition)
        .populate('userTags', ['name', 'imgUrl'])
        .populate('author', ['name', 'imgUrl'])
        .populate('category', 'name')
        .sort({updatedAt: 'desc'})
        .skip(skip)
        .limit(limit)
        .lean();

    return this.postResponse(result, search.userId);
  }

  public async getPostsOf({userId, profileId, skip = this.skip, limit = this.limit}): Promise<PostResponse[]> {
    const result = await this.PostModel
        .find()
        .where('author')
        .equals(profileId)
        .populate('userTags', ['name', 'imgUrl'])
        .populate('author', ['name', 'imgUrl'])
        .populate('category', ['name'])
        .sort({createdAt: 'desc'})
        .skip(skip)
        .limit(limit);
    return this.postResponse(result, userId);
  }
}
