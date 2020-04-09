import { Inject, Service } from 'typedi';
import { IUserInputDTO, IUser } from '../interface/user';
import jwt from 'jsonwebtoken';
import getRole from '../util/getRole';
import  { Document, Model } from 'mongoose'

@Service()
export class AuthService {
  constructor(
    @Inject('UserModel') private UserModel : Model<IUser & Document>,
  ) { }
  
  public async logIn(userInputDTO: IUserInputDTO) {
    console.log(this.UserModel);

    let user = await this.UserModel.findOne({ email: userInputDTO.email });
    if (!user) {
      const role = getRole(userInputDTO.email);
      user = await this.UserModel.create({ ...userInputDTO, role: role });
    }
    const token = this.generateToken(user);
    console.log(user);
    return { token, user };
  }


  private generateToken(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    /**
     * A JWT means JSON Web Token, so basically it's a json that is _hashed_ into a string
     * The cool thing is that you can add custom properties a.k.a metadata
     * Here we are adding the userId, role and name
     * Beware that the metadata is public and can be decoded without _the secret_
     * but the client cannot craft a JWT to fake a userId
     * because it doesn't have _the secret_ to sign it
     * more information here: https://softwareontheroad.com/you-dont-need-passport
     */
    return jwt.sign(
      {
        _id: user._id, // We are gonna use this in the middleware 'isAuth'
        role: user.role,
        name: user.name,
        exp: exp.getTime() / 1000,
      },
      'secret',
    );
  }

}
