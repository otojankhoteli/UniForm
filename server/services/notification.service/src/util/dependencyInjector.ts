import {Container, ContainerInstance} from 'typedi';
import logger from './logger';
import {rabbit} from '../message.queue/index';


export default () => {
  try {
    Container.set('logger', logger);
    logger.info('Agenda injected into container');
    Container.set('Rabbit', rabbit);
  } catch (e) {
    logger.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};
