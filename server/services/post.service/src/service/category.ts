import {Service, Inject, Container} from 'typedi';
import {Document, Model} from 'mongoose';
import {ICategoryDTO, ICategorySearchModel} from '../interface/Category';
import {UserService} from './user';
import NotFoundError from '../util/error/NotFoundError';

@Service()
export class CategoryService {
  constructor(
      @Inject('CategoryModel')
      private CategoryModel: Model<ICategoryDTO & Document>,
      private UserService: UserService = Container.get('UserService'),
  ) {
  }

  public async save(category: ICategoryDTO) {
    try {
      // const user = await this.UserService.getUser(category.author);
      // category.isMain = user.isAdmin;
      return this.CategoryModel.create(category);
    } catch (e) {
      if (e instanceof NotFoundError) {
        throw new NotFoundError(`Can not create category: ${e.message}`);
      }
    }
  }

  public async findTop(options: ICategorySearchModel) {
    return this.CategoryModel.find()
        .sort({name: 'desc'})
        .skip(options.skip)
        .limit(options.limit);
  }

  public async findByPrefix(options: ICategorySearchModel) {
    // return this.CategoryModel.find({name: {$regex: new RegExp(`^${options.name}`)}})
    return this.CategoryModel
        .find()
        .where('name')
        .regex(new RegExp(`^${options.name}`))
        .skip(options.skip)
        .limit(options.limit);
  }

  public test() {
    return 'test';
  }
}
