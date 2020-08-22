import rabbit from 'rabbot';
import logger from '../util/logger';
import {settings} from './topology';
import {singleAddressNotificationHandler, multiAddressNotificationHandler} from './handler';
import {NotificationType} from '../interface/Notification';


const registerRabbitHandlers = () => {
  logger.info('registering rabbit handlers');
  rabbit.handle(NotificationType.SingleAddress, singleAddressNotificationHandler);
  rabbit.handle(NotificationType.MultiAddress, multiAddressNotificationHandler);
};


const connectRabbit = async () => {
  registerRabbitHandlers();

  try {
    await rabbit.configure(settings);

    logger.info(`rabbit-mq connected on ${settings.connection.server}:${settings.connection.port}`);
  } catch (e) {
    logger.error('rabbit-mq connection error: %o', e);
    throw e;
  }
  return rabbit;
};

export {rabbit, connectRabbit, registerRabbitHandlers};


