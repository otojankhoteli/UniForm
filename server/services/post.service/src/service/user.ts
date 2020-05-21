import {Service, Inject} from 'typedi';
import {Document, Model} from 'mongoose';
import {IUser} from '../interface/User';
import NotFoundError from '../util/error/NotFoundError';


// todo get user from messaging queue
@Service()
export class UserService {
  constructor(
      @Inject('UserModel') private UserModel: Model<IUser & Document>,
  ) {
  }

  public async save(user: IUser) {
    let existingUser = await this.UserModel.findOne({email: user.email});
    if (!existingUser) {
      existingUser = await this.UserModel.create(user);
    }

    return existingUser;
  }

  public async find(options) {
    return this.UserModel.find(options);
  }

  public async findById(id) {
    return this.UserModel.findById(id);
  }

  public isAdmin(user) {
    return user.isAdmin;
  }

  public test() {
    return 'user';
  }

  // todo better be transactional
  async subscribe(userId: string, categoryId: string) {
    // this.
    return this.UserModel
        .findByIdAndUpdate(userId, {$addToSet: {subscribedCategories: categoryId}}, {new: true});
  }

  // todo better be transactional
  async unsubscribe(userId: string, categoryId: string) {
    return this.UserModel
        .findByIdAndUpdate(userId, {$pullAll: {subscribedCategories: [categoryId]}}, {new: true});
  }
}
