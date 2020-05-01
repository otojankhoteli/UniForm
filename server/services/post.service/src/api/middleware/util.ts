import {Container} from 'typedi';
import {Logger} from 'winston';


export const pageParser = (req, res, next) => {
  const logger: Logger = Container.get('logger');
  logger.silly('parsing skip and limit query options');
  try {
    if (req.query.skip) req.query.skip = parseInt(req.query.skip);
    if (req.query.limit) req.query.limit = parseInt(req.query.limit);
    next();
  } catch (e) {
    logger.error('could not parse %o', e);
  }
};
