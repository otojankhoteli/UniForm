import decodeToken from '../helper/decodeToken';

const getTokenFromHeader = req => {
  if (
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
  ) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};

//TODO identify where to put logged in user info
export default (req, res, next) => {
  const token = getTokenFromHeader(req);
  req.currentUser = decodeToken(token);
  res.json(decodeToken(token));
}
