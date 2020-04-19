import {Container} from 'typedi';
import LoggerInstance from './logger';
import UserModel from '../db/model/user';
import AuthenticatedUserModel from '../db/model/authenticatedUser';
import {EventEmitter} from 'events';
import {rabbit} from '../message.queue';
import {UserPublisher} from '../message.queue/UserPublisher';

export default () => {
  try {
    Container.set('AuthenticatedUserModel', AuthenticatedUserModel);
    Container.set('UserModel', UserModel);
    Container.set('logger', LoggerInstance);
    Container.set('EventEmitter', new EventEmitter());
    Container.set('Rabbit', rabbit);
    Container.set('UserPublisher', new UserPublisher(rabbit));
    LoggerInstance.info('✌️ Agenda injected into container');
  } catch (e) {
    LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};
