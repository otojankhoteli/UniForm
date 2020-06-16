import logger from '../util/logger';
import {Container} from 'typedi';
import {UserService} from '../service/user';


const registerUser = async (msg) => {
  try {
    logger.silly('registering user: %o', msg.body);
    msg.ack();

    const userService = Container.get(UserService);
    await userService.save(msg.body);
    logger.silly('user registered successfully');
  } catch (e) {
    logger.error('error registering user');
    // todo route message to error queue
  }
};


export {registerUser};
