import { Container } from 'typedi';
import LoggerInstance from './logger';
import UserModel from '../db/model/user';

export default () => {
  try {
    Container.set('UserModel',UserModel);
    Container.set('logger', LoggerInstance);
    LoggerInstance.info('✌️ Agenda injected into container');
  } catch (e) {
    LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};
