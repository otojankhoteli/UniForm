import jwt from 'jsonwebtoken';
import { config } from '../../../config/index';
import { IUser } from '../../../interface/User';
import AppError from '../../../util/error/AppError';

export default (token: string): IUser => {
  let result = null;
  if (token) {
    jwt.verify(token, config.authentication.secret, function (err, decoded) {
      if (err) {
        throw new AppError(401, "jwt expired");//TODO change to relevant error type
      }
      result = decoded;
    });
  }
  return result as IUser;
};