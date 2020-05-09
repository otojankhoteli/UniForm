import { Inject, Service } from 'typedi';
import getRole from './util/helper/getRole';
import { Document, Model } from 'mongoose';
import { Events } from '../subscriber/event';
import { EventEmitter } from 'events';
import { IUser, UserSearchResultViewModel, UserSearchOptions } from '../interface/user ';

@Service()
export class UserService {
  private readonly skip = 0;
  private readonly limit = 10;

  constructor(
    @Inject('UserModel') private UserModel: Model<IUser & Document>,
  ) {
  }

  public async get(searchOptions: UserSearchOptions): Promise<UserSearchResultViewModel[]> {
    if (!searchOptions.skip) searchOptions.skip = this.skip;
    if (!searchOptions.limit) searchOptions.limit = this.limit;
    let users: (IUser & Document)[] = [];


    if(searchOptions.name){
      users = await this.UserModel
      // .find(searchOptions.name ? { $text: { $search: searchOptions.name } } : {})
      .where('email')
      .regex(new RegExp(`^${searchOptions.name}`))
      .skip(searchOptions.skip)
      .limit(searchOptions.limit);
    }else{
      users = await this.UserModel
      .find()
      // .find(searchOptions.name ? { $text: { $search: searchOptions.name } } : {})
      .sort({ name: 'desc' })
      .skip(searchOptions.skip)
      .limit(searchOptions.limit);
    }

    

    return users.map<UserSearchResultViewModel>((user) => ({
      email: user.email,
      id: user.id,
      name: user.name,
      photoURL: user.photoURL,
      role: user.role,
      surname: user.surname
    }));
  }
}
