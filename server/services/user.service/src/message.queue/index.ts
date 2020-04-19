// import {Container} from 'typedi';
import rabbit from 'rabbot';
import logger from '../util/logger';
import {settings, UserPublisherSettings} from './topology';


const registerRabbitHandlers = () => {
  logger.info('registering rabbit handlers');
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


