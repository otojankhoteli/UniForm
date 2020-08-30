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
    logger.silly('sending post upvote notification');
    await postNotificationPublisher.postUpVote(data);
  });
  emitter.on(Events.post.downVote, async (data: {postId: string, downvoterId: string}) => {
    logger.silly('sending post downvote notification');
    await postNotificationPublisher.postDownVote(data);
  });
  emitter.on(Events.post.new, async (postId) => {
    logger.silly('sending post tag notification');
    await postNotificationPublisher.postTag(postId);
  });
  emitter.on(Events.comment.new, async (commentId) => {
    logger.silly('sending notifications for new comment');
    await postNotificationPublisher.newComment(commentId);
  });
  emitter.on(Events.comment.upvote, async (data: {commentId: string, upvoterId: string}) => {
    logger.silly('sending comment upvote notification');
    await postNotificationPublisher.commentUpVote(data);
  });
  emitter.on(Events.comment.downVote, async (data: {commentId: string, downvoterId: string}) => {
    logger.silly('sending comment upvote notification');
    await postNotificationPublisher.commentDownVote(data);
  });
  logger.info('user signup handler registered');
};

export {registerHandlers};
