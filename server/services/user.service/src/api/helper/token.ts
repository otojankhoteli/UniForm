import { IUser } from '../../interface/user';
import jwt from 'jsonwebtoken';
import { config } from '../../config/index';

export const generateToken = (user: IUser): string => {
  const today = new Date();
  const exp = new Date(today.getTime() + config.authentication.tokenValid);
  return jwt.sign(
    {
      _id: user._id,
      role: user.role,
      name: user.name,
      email: user.email,
      exp: exp.getTime() / 1000,
    },
    config.authentication.secret,
  );
};
// TODO put date values in config

export const decodeToken = (token: string): IUser => {
  let result = null;
  if (token) {
    jwt.verify(token, config.authentication.secret, function (err, decoded) {
      if (err) {
        throw err;// TODO throw exception
      }
      result = decoded;
    });
  }
  return result as IUser;
};