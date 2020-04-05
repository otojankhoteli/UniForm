import {Inject} from 'typedi';
import {IUserInputDTO, IUser} from '../interface/user';
import {Document, Model} from 'mongoose';


// eslint-disable-next-line no-unused-vars
namespace Models {
  export type UserModel = Model<IUser & Document>;
}


export class AuthService {
  constructor(
      @Inject('userModel') private userModel: Models.UserModel,
  ) {}

  public async logIn(userInputDTO: IUserInputDTO) {
    const user = this.userModel.find({mail: userInputDTO.email});
    console.log(user);
    return user;
  }
}
