import { Inject, Service } from 'typedi';
import { ISignUpUserInputDTO, IUser } from '../interface/user';
import getRole from './util/helper/getRole';
import { Document, Model } from 'mongoose';
import { IAuthenticatedUser } from '../interface/authenticatedUser';
import ApplicationError from '../util/error/ApplicationError';
import { config } from '../config/index';
import { userInfo } from 'os';
import { unwatchFile } from 'fs';
import { ExceptionHandler } from 'winston';

@Service()
export class AuthService {
  constructor(
    @Inject('UserModel') private UserModel: Model<IUser & Document>,
    @Inject('AuthenticatedUserModel') private AuthenticatedUserModel: Model<IAuthenticatedUser & Document>,
  ) { }

  public async logIn(userInputDTO: ISignUpUserInputDTO): Promise<IUser> {

    // let user = await this.UserModel.findOne({ email: userInputDTO.email });
    const role = getRole(userInputDTO.email);
    // if (user)
    //   user.update({ ...userInputDTO, role: role })
    // else
    //   user = await this.UserModel.create({ ...userInputDTO, role: role });
    const user = this.UserModel.findOneAndUpdate({ email: userInputDTO.email },
      { ...userInputDTO, role: role },
      { upsert: true });
    let today = new Date();
    // let authenticatedUser = await this.AuthenticatedUserModel.findOne({ email: userInputDTO.email });

    this.AuthenticatedUserModel.findOneAndUpdate({ email: userInputDTO.email },
      {
        email: userInputDTO.email,
        expirationDate: today.setDate(today.getDate() + config.authentication.refreshTokenValid),
        refreshToken: userInputDTO.refreshToken
      },
      { upsert: true }
    );

    return user;
  }

  public async validateTokenRefresh(refreshToken: String, user: IUser) {
    var authenticatedUser = await this.AuthenticatedUserModel.findOne({ email: user.email });
    if (authenticatedUser.refreshToken != refreshToken)
      throw new ApplicationError("wrong user");
    if (authenticatedUser.expirationDate < new Date())
      throw new ApplicationError("refresh token has expired");//TODO create specific error type?!
    return true;
  }


}
//TODO remove dependency on Mongo specific repository