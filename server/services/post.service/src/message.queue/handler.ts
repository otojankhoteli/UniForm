import {IUser} from '../interface/User';
import logger from '../util/logger';
import {Container} from 'typedi';
import {UserService} from '../service/user';


const registerUser = async (msg) => {
  try {
    logger.silly('registering user: %o', msg.body);

    const userService = Container.get(UserService);
    await userService.save(msg.body);
    logger.silly('user registered successfully');
    msg.ack();
  } catch (e) {
    logger.error('error registering user');
    msg.nack();
  }
};

export {registerUser};
