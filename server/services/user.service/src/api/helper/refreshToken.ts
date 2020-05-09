import { config } from '../../config/index';
import { IUser } from '../../interface/user ';
import jwt from 'jsonwebtoken';

export const generateRefreshToken = (user: IUser): string => {
  const today = new Date();
  const exp = new Date(today.getTime() + config.authentication.tokenValid);
  return jwt.sign(
    {
      _id: user._id,
      role: user.role,
      name: user.name,
      email: user.email,
      exp: exp.getTime()
    },
    config.authentication.refreshSecret,
  );
}

export const decodeRefreshToken = (token: string): IUser => {
  let result = null;//TODO improve solution??
  if (token) {
    jwt.verify(token, config.authentication.refreshSecret, function (err, decoded) {
      if (err) {
        throw err;// TODO throw exception
      }
      result = decoded;
    });
  }
  return result as IUser;
};