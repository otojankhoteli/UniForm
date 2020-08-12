import rabbit from 'rabbot';
import logger from '../util/logger';
import {NotificationPublisherSettings, settings} from './topology';
import {receiveNotification} from './handler';


const registerRabbitHandlers = () => {
  logger.info('registering rabbit handlers');
  rabbit.handle(NotificationPublisherSettings.type, receiveNotification);
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


