import logger from '../util/logger';
import {Container} from 'typedi';
import {NotificationService} from '../service/notification';

const wrapper = (fn) => {
  return async (msg) => {
    try {
      await fn(msg);
    } catch (e) {
      logger.error(e);
    }
  };
};

const reactNotification = (msg) => {
  return wrapper(async () => {
    logger.silly('got react notification: %o', msg.body);
    msg.ack();

    const notificationService = Container.get(NotificationService);
    await notificationService.save(msg.body);
    logger.silly('react notification created');
  })(msg);
};


const tagNotification = (msg) => {
  return wrapper(async () => {
    logger.silly('got tag notification: %o', msg.body);
    msg.ack();

    const notificationService = Container.get(NotificationService);
    // todo handle notification
  })(msg);
};

export {reactNotification, tagNotification};
