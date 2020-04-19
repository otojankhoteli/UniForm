import {Inject, Service} from 'typedi';
import {ISignUpUserInputDTO, IUser} from '../interface/user';
import getRole from './util/helper/getRole';
import {Document, Model} from 'mongoose';
import {IAuthenticatedUser} from '../interface/authenticatedUser';
import ApplicationError from '../util/error/ApplicationError';
import {config} from '../config/index';
import {Emitter} from 'event-emitter';
import {Events} from '../subscriber/event';

@Service()
export class AuthService {
  constructor(
      @Inject('UserModel') private UserModel: Model<IUser & Document>,
      @Inject('AuthenticatedUserModel') private AuthenticatedUserModel: Model<IAuthenticatedUser & Document>,
      @Inject('EventEmitter') private eventEmitter: Emitter,
  ) {
  }

  public async logIn(userInputDTO: ISignUpUserInputDTO): Promise<IUser> {
    let user = await this.UserModel.findOne({email: userInputDTO.email});
    if (!user) {
      const role = getRole(userInputDTO.email);
      user = await this.UserModel.create({...userInputDTO, role: role});
      this.eventEmitter.emit(Events.user.signUp, user);
    }

    const today = new Date();
    this.AuthenticatedUserModel.findOneAndUpdate({email: userInputDTO.email},
        {
          email: userInputDTO.email,
          expirationDate: today.setDate(today.getDate() + config.authentication.refreshTokenValid),
          refreshToken: userInputDTO.refreshToken,
        },
        {upsert: true},
    );

    return user;
  }

  public async validateTokenRefresh(refreshToken: String, user: IUser) {
    const authenticatedUser = await this.AuthenticatedUserModel.findOne({email: user.email});
    if (authenticatedUser.refreshToken != refreshToken) {
      throw new ApplicationError('wrong user');
    }
    if (authenticatedUser.expirationDate < new Date()) {
      throw new ApplicationError('refresh token has expired');
    }// TODO create specific error type?!
    return true;
  }
}
// TODO remove dependency on Mongo specific repository
