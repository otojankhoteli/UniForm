import { Container } from 'typedi';
import LoggerInstance from './logger';
import UserModel from '../db/model/user';
import AuthenticatedUserModel from '../db/model/authenticatedUser';

export default () => {
  try {
    Container.set('AuthenticatedUserModel', AuthenticatedUserModel);
    Container.set('UserModel', UserModel);
    Container.set('logger', LoggerInstance);
    LoggerInstance.info('✌️ Agenda injected into container');
  } catch (e) {
    LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};
