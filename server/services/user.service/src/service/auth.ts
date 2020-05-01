import { Inject, Service } from 'typedi';
import { IUser } from '../interface/user';
import getRole from './util/helper/getRole';
import { Document, Model } from 'mongoose';
import { Emitter } from 'event-emitter';

@Service()
export class AuthService {
  constructor(
    @Inject('UserModel') private UserModel: Model<IUser & Document>,
    @Inject('EventEmitter') private eventEmitter: Emitter,
  ) {
  }

  public async logIn(userInputDTO: IUser): Promise<IUser> {
    const role = getRole(userInputDTO.email);

    const user = await this.UserModel.findOneAndUpdate({ email: userInputDTO.email },
      { ...userInputDTO, role: role },
      { upsert: true });
    let today = new Date();

    // const authenticatedUser = this.AuthenticatedUserModel.findOneAndUpdate({ email: userInputDTO.email },
    //   {
    //     email: userInputDTO.email,
    //     expirationDate: today.setDate(today.getDate() + config.authentication.refreshTokenValid),
    //     refreshToken: userInputDTO.refreshToken
    //   },
    //   { upsert: true },
    //   (err, doc) => {
    //     if (err)
    //       throw err;
    // });

    return user;
    // let user = await this.UserModel.findOne({email: userInputDTO.email});
    // if (!user) {
    //   const role = getRole(userInputDTO.email);
    //   user = await this.UserModel.create({...userInputDTO, role: role});
    //   this.eventEmitter.emit(Events.user.signUp, user);//TODO add 
    // }

    // const today = new Date();
    // this.AuthenticatedUserModel.findOneAndUpdate({email: userInputDTO.email},
    //     {
    //       email: userInputDTO.email,
    //       expirationDate: today.setDate(today.getDate() + config.authentication.refreshTokenValid),
    //       refreshToken: userInputDTO.refreshToken,
    //     },
    //     {upsert: true},
    // );

    // return user;
  }

  // public async validateTokenRefresh(refreshToken: String) {
  //   const authenticatedUser = await this.AuthenticatedUserModel.findOne({ refreshToken: refreshToken });
  //   if (authenticatedUser.refreshToken != refreshToken) {
  //     throw new ApplicationError('wrong refresh token');
  //   }
  //   if (authenticatedUser.expirationDate < new Date()) {
  //     throw new ApplicationError('refresh token has expired');
  //   }// TODO create specific error type?!
  //   return true;
  // }
}
// TODO remove dependency on Mongo specific repository
