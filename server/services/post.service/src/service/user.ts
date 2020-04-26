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
    return this.UserModel.create(user);
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
}
