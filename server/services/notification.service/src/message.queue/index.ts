import rabbit from 'rabbot';
import logger from '../util/logger';
import {settings} from './topology';
import {reactNotification, tagNotification} from './handler';
import {PostNotification} from '../interface/Notification';


const registerRabbitHandlers = () => {
  logger.info('registering rabbit handlers');
  rabbit.handle(PostNotification.React, reactNotification);
  rabbit.handle(PostNotification.Tag, tagNotification);
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


