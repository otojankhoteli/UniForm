import logger from '../util/logger';
import {NotificationPublisher} from '../message.queue/notification/NotificationPublisher';
import {Container} from 'typedi';
import {EventEmitter} from 'events';
import {Events} from './event';


const publishNotification = async (notification) => {
  try {
    logger.silly('publish notification %o', notification);
    const notificationPublisher: NotificationPublisher = Container.get('NotificationPublisher');
    await notificationPublisher.publish(notification);
  } catch (e) {
    logger.error('error publishing post');
    logger.error(e);
  }
};


const registerHandlers = () => {
  const emitter: EventEmitter = Container.get('EventEmitter');

  emitter.on(Events.post.new, publishNotification);
  logger.info('user signup handler registered');
};

export {registerHandlers};
