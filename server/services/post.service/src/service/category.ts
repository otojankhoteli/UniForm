import {Service, Inject, Container} from 'typedi';
import {Document, Model} from 'mongoose';
import {ICategoryDTO, ICategorySearchModel} from '../interface/Category';
import {UserService} from './user';
import NotFoundError from '../util/error/NotFoundError';
import {Logger} from 'winston';
import {IUser} from '../interface/User';


@Service()
export class CategoryService {
  private readonly skip = 0;
  private readonly limit = 10;

  constructor(
    @Inject('CategoryModel')
    private CategoryModel: Model<ICategoryDTO & Document>,
    @Inject('UserModel')
    private UserModel: Model<IUser & Document>,
    @Inject('logger')
    private logger: Logger,
  ) {
  }

  public async save(category: ICategoryDTO) {
    const user = await this.UserModel.findById(category.author);
    if (!user) {
      throw new NotFoundError(`Can not create category, the user with the id: ${category.author} does not exist`);
    }
    category.isVerified = user.role === 'admin';
    return this.CategoryModel.create(category);
  }


  public async findById(id: string) {
    return this.CategoryModel.findById(id);
  }

  public async findTop(query: ICategorySearchModel, userId: string) {
    if (!query.skip) query.skip = this.skip;
    if (!query.limit) query.limit = this.limit;

    const result = await this.CategoryModel.find()
        .sort({name: 'desc'})
        .populate('author', ['role', 'imgUrl', 'name', 'email'])
        .skip(query.skip)
        .limit(query.limit);

    return Promise.all(result.map(async (category) => ({
      id: category.id,
      author: category.author,
      isVerified: category.isVerified,
      memberCount: category.memberCount,
      description: category.description,
      isSubscribed: await this.isSubscribedTo(userId, category.id),
      name: category.name,
      imgUrl: category.imgUrl,
      postCount: category.postCount,
    })));
  }

  private async isSubscribedTo(userId, categoryId) {
    const res = await this.UserModel
        .findOne({_id: userId, subscribedCategories: categoryId});
    if (res) {
      return true;
    }
    return false;
  }

  public async findByPrefix(query: ICategorySearchModel, userId: string) {
    if (!query.skip) query.skip = this.skip;
    if (!query.limit) query.limit = this.limit;

    const result = await this.CategoryModel
        .find()
        .where('name')
        .regex(new RegExp(`^${query.name}`))
        .populate('author', ['role', 'imgUrl', 'name', 'email'])
        .skip(query.skip)
        .limit(query.limit);

    return Promise.all(result.map(async (category) => ({
      id: category.id,
      author: category.author,
      isVerified: category.isVerified,
      memberCount: category.memberCount,
      description: category.description,
      isSubscribed: await this.isSubscribedTo(userId, category.id),
      name: category.name,
      imgUrl: category.imgUrl,
      postCount: category.postCount,
    })));
  }
}
