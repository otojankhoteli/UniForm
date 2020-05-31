import decodeToken from './helper/decodeToken';
import AppError from '../../util/error/AppError';

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
    throw new AppError(403, "no token provided");//TODO change to relevant error type
  req.currentUser = decodeToken(token);
  next();
};