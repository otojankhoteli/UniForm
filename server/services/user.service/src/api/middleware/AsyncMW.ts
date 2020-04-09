// const logger = require('./logger');
export default (fn) => (req, res, next) => {
  // const ip = req.ip;
  // logger.debug(`${ip} ${req.originalUrl}`);
  Promise.resolve(fn(req, res, next))
      .catch(next);
};
