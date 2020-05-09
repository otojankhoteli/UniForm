import {IUser} from '../interface/user ';
import {Container} from 'typedi';
import {UserPublisher} from '../message.queue/UserPublisher';
import logger from '../util/logger';
import {Events} from './event';
import {EventEmitter} from 'events';


const onUserSignUp = (user: IUser) => {
  logger.silly('Event Handler user sign up %o', onUserSignUp.name);
  const userPublisher: UserPublisher = Container.get('UserPublisher');
  userPublisher.publish(user);
};


const registerHandlers = () => {
  const emitter: EventEmitter = Container.get('EventEmitter');

  emitter.on(Events.user.signUp, onUserSignUp);
};

export {registerHandlers};

