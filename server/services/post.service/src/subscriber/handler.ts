import logger from '../util/logger';
import {NotificationPublisher, PostNotificationPublisher} from '../message.queue/notification/NotificationPublisher';
import {Container} from 'typedi';
import {EventEmitter} from 'events';
import {Events} from './event';
import {IPost} from '../interface/Post';

const publishNotification = async (notification) => {
  try {
    logger.silly('publish notification %o', notification);
    const notificationPublisher: NotificationPublisher = Container.get('NotificationPublisher');
    await notificationPublisher.publish(notification);
  } catch (e) {
    logger.error('error publishing post');
    logger.error(e);
  }
};


const registerHandlers = () => {
  const emitter: EventEmitter = Container.get('EventEmitter');
  const postNotificationPublisher: PostNotificationPublisher = Container.get(PostNotificationPublisher);

  emitter.on(Events.post.upvote, async (data: {postId: string, upvoterId: string}) => {
    await postNotificationPublisher.upVote(data);
  });
  emitter.on(Events.post.downVote, async (data: {postId: string, downvoterId: string}) => {
    await postNotificationPublisher.downVote(data);
  });
  emitter.on(Events.post.new, async (postId) => {
    await postNotificationPublisher.postTag(postId);
  });
  logger.info('user signup handler registered');
};

export {registerHandlers};
