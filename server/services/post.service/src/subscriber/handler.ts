import {EventEmitter} from 'events';
import {Container} from 'typedi';
import {Events} from './event';


export const registerHandlers = () => {
  const emitter: EventEmitter = Container.get('EventEmitter');
};
