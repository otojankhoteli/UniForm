import jwt from 'jsonwebtoken';
import {config} from '../../config/index';

export default (token: string) => {
  let result = null;
  if (token) {
    jwt.verify(token, config.authentication.secret, function(err, decoded) {
      if (err) {
        throw Error;// TODO throw exception
      }
      result = decoded;
    });
  }
  return result;
};
