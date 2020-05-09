import {Container} from 'typedi';
import logger from './logger';

export default () => {
  try {
    Container.set('logger', logger);
    logger.info('Agenda injected into container');
  } catch (e) {
    logger.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};
