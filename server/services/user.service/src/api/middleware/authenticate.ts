import { decodeToken } from '../helper/token';
import ApplicationError from '../../util/error/ApplicationError';

const getTokenFromHeader = (req): string => {
  if (
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
  ) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};

export default (req, _, next): void => {
  const token = getTokenFromHeader(req);
  if (token === null)
    throw new ApplicationError("no token provided");//TODO change to relevant error type
  req.currentUser = decodeToken(token);
  next();
};