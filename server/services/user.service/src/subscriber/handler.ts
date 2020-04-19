import {IUser} from '../interface/user';
import {Container} from 'typedi';
import {UserPublisher} from '../message.queue/UserPublisher';
import logger from '../util/logger';
import {Emitter} from 'event-emitter';
import {Events} from './event';


const onUserSignUp = (user: IUser) => {
  logger.silly('Event Handler user sign up %o', onUserSignUp.name);
  const userPublisher: UserPublisher = Container.get('UserPublisher');
  userPublisher.publish(user);
};


const registerHandlers = () => {
  const emitter: Emitter = Container.get('EventEmitter');

  emitter.on(Events.user.signUp, onUserSignUp);
};

export {registerHandlers};

