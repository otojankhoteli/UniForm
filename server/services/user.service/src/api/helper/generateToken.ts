import {IUser} from '../../interface/user';
import jwt from 'jsonwebtoken';
import {config} from '../../config/index';

export default (user: IUser): string => {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);
  // TODO implement refresh token logic also
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
