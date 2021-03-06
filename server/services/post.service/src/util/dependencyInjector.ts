import {Container} from 'typedi';
import logger from './logger';
import CategoryModel from '../db/model/category';
import {UserService} from '../service/user';
import {UserModel} from '../db/model/user';
import {PostModel} from '../db/model/post';
import {HashTagModel} from '../db/model/hashtag';
import {EventEmitter} from 'events';
import {rabbit} from '../message.queue/index';
import {VoteService} from '../service/vote';
import {NotificationPublisher, PostNotificationPublisher} from '../message.queue/notification/NotificationPublisher';
import {CommentModel} from '../db/model/comment';

export default () => {
  try {
    Container.set('EventEmitter', new EventEmitter());
    Container.set('logger', logger);
    Container.set('CategoryModel', CategoryModel);
    Container.set('UserModel', UserModel);
    Container.set('PostModel', PostModel);
    Container.set('CommentModel', CommentModel);
    Container.set('HashTagModel', HashTagModel);
    Container.set('Rabbit', rabbit);
    Container.set('NotificationPublisher', new NotificationPublisher(Container.get('Rabbit')));
    // Container.set('PostNotificationPublisher', new PostNotificationPublisher(Container.get('NotificationPublisher'),
    //     Container.get('logger')));
    Container.set('PostVoteService', new VoteService(Container.get('logger'), Container.get('PostModel'), Container.get('UserModel')));
    Container.set('CommentVoteService', new VoteService(Container.get('logger'), Container.get('CommentModel'), Container.get('UserModel')));
    logger.info('Agenda injected into container');
  } catch (e) {
    logger.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};
