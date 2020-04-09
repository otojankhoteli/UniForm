import jwt from 'jsonwebtoken';
import {config} from '../../config/index'
import { decode } from 'punycode';

const getTokenFromHeader = req => {
  if (
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
  ) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};


export default (req, res, next) => {
  const token = getTokenFromHeader(req);
  console.log(token);
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.authentication.secret, function (err, decoded) {
      if (err) {
        return res.status(401).json({ "error": true, "message": 'Unauthorized access.' });
      }
      req.currentUser = decoded;
      next();
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      "error": true,
      "message": 'No token provided.'
    });
  }
}


