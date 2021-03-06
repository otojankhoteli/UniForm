import {Service, Inject} from 'typedi';
import {Document, Model} from 'mongoose';
import {IUser} from '../interface/User';


@Service()
export class UserService {
  constructor(
      @Inject('UserModel') private UserModel: Model<IUser & Document>,
      @Inject('CategoryModel') private CategoryModel: Model<Document>,
  ) {
  }

  private userResponse = (user) => {
    const result: IUser = {
      _id: user._id,
      email: user.email,
      name: user.name,
      deviceId: user.deviceId,
      imgUrl: user.imgUrl,
      subscribedCategories: user.subscribedCategories,
      role: user.role,
      voteCount: user.voteCount,
    };
    return result;
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
    const conditions = name ? {$or: [{name: {$regex: regex}}, {email: {$regex: regex}}]} : {};
    const result = await this.UserModel
        .find(conditions)
        .skip(skip)
        .limit(limit)
        .sort({voteCount: 'desc'})
        .lean();

    return result.map(this.userResponse);
  }

  public async findById(id) {
    const result = await this.UserModel.findById(id)
        .lean();
    return this.userResponse(result);
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
