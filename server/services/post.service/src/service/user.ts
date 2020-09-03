import {Service, Inject} from 'typedi';
import {Document, Model} from 'mongoose';
import {IUser} from '../interface/User';
import NotFoundError from '../util/error/NotFoundError';
import {Role} from "../../../../../client/mobileClient/src/api/auth/AuthApiModel";


// todo get user from messaging queue
@Service()
export class UserService {
  constructor(
      @Inject('UserModel') private UserModel: Model<IUser & Document>,
      @Inject('CategoryModel') private CategoryModel: Model<Document>,
  ) {
  }

  public async save(user: IUser) {
    let existingUser = await this.UserModel.findOne({email: user.email});
    if (!existingUser) {
      existingUser = await this.UserModel.create(user);
    }

    return existingUser;
  }

  public async search({name, skip=0, limit=10}) {
    const regex = new RegExp(`${name}`, 'i');
    const result = await this.UserModel
        .find({$or: [{name: {$regex: regex}}, {email: {$regex: regex}}]})
        .skip(skip)
        .limit(limit)
        .lean();

    return result.map((user) => {
      return {
        _id: user._id,
        email: user.email,
        name: user.name,
        deviceId: user.deviceId,
        imgUrl: user.imgUrl,
        subscribedCategories: user.subscribedCategories,
        role: user.role,
        voteCount: user.voteCount,
      };
    });
  }

  public async findById(id) {
    const result = await this.UserModel.findById(id)
        .lean();
    const response: IUser = {
      _id: result._id,
      email: result.email,
      name: result.name,
      deviceId: result.deviceId,
      imgUrl: result.imgUrl,
      subscribedCategories: result.subscribedCategories,
      role: result.role,
      voteCount: result.voteCount,
    };
    return response;
  }

  private async isSubscribedTo(userId, categoryId) {
    return this.UserModel
        .findOne({_id: userId, subscribedCategories: categoryId});
  }

  // todo better be transactional
  async subscribe(userId: string, categoryId: string) {
    if (!await this.isSubscribedTo(userId, categoryId)) {
      await this.UserModel
          .findByIdAndUpdate(userId, {$addToSet: {subscribedCategories: categoryId}}, {new: true});

      await this.CategoryModel.findByIdAndUpdate(categoryId, {$inc: {memberCount: 1}});
    }
  }

  // todo better be transactional
  async unsubscribe(userId: string, categoryId: string) {
    if (await this.isSubscribedTo(userId, categoryId)) {
      await this.UserModel
          .findByIdAndUpdate(userId, {$pullAll: {subscribedCategories: [categoryId]}}, {new: true});

      await this.CategoryModel.findByIdAndUpdate(categoryId, {$inc: {memberCount: -1}});
    }
  }
}
