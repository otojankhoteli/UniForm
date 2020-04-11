import {Service, Inject} from 'typedi';
import {Document, Model} from 'mongoose';
import {IUser} from '../interface/User';
import NotFoundError from '../util/error/NotFoundError';


@Service()
export class UserService {
  constructor(
      @Inject('UserModel') private UserModel: Model<IUser & Document>,
  ) {
  }


}
