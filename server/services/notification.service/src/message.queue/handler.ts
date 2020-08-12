import logger from '../util/logger';
import {Container} from 'typedi';
import {NotificationService} from '../service/notification';


const receiveNotification = async (msg) => {
  try {
    logger.silly('got notification : %o', msg.body);
    msg.ack();

    const notificationService = Container.get(NotificationService);
    await notificationService.save(msg.body);
    logger.silly('notification created');
  } catch (e) {
    logger.error('error creating notification');
    console.error(e);
  }
};


export {receiveNotification};
