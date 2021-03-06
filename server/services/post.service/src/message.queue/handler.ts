import logger from '../util/logger';
import {Container} from 'typedi';
import {UserService} from '../service/user';
import {IUser, MQUserModel} from '../interface/User';


const registerUser = async (msg) => {
  try {
    logger.silly('registering user: %o', msg.body);
    msg.ack();

    const userService = Container.get(UserService);
    const user: MQUserModel = msg.body;
    const newUser: IUser = {
      ...user,
      imgUrl: user.photoURL,
      name: user.name + ' ' + user.surname,
    };
    await userService.save(newUser);
    logger.silly('user registered successfully');
  } catch (e) {
    logger.error('error registering user');
    // todo route message to error queue
  }
};


export {registerUser};
