import {Container} from 'typedi';
import logger from './logger';
import CategoryModel from '../db/model/category';
import {UserService} from '../service/user';
import {UserModel} from '../db/model/user';
import {PostModel} from '../db/model/post';
import {HashTagModel} from '../db/model/hashtag';

export default () => {
  try {
    Container.set('CategoryModel', CategoryModel);
    Container.set('UserModel', UserModel);
    Container.set('PostModel', PostModel);
    Container.set('HashTagModel', HashTagModel);
    Container.set('UserService', new UserService(Container.get('UserModel')));
    Container.set('logger', logger);
    logger.info('Agenda injected into container');
  } catch (e) {
    logger.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};
