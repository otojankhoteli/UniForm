import jwt from 'jsonwebtoken';
import { config } from '../../../config/index';
import { IUser } from '../../../interface/User';

export default (token: string): IUser => {
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