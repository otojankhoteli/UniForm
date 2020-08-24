import logger from '../util/logger';
import {Container} from 'typedi';
import {NotificationService} from '../service/notification';
import {MultiAddressNotification, NotificationViewModel, SingleAddressNotification} from '../interface/Notification';
import {NotificationSender} from '../service/sender';
import {NotificationType} from '../interface/Notification';


const getNotificationText = (notification: NotificationViewModel) => {
  switch (notification.type) {
    case NotificationType.PostUpvote:
      return `${notification.fromName} upvoted your post: ${notification.postText}`;
    case NotificationType.PostDownvote:
      return `${notification.fromName} downvoted your post: ${notification.postText}`;
    case NotificationType.CommentNew:
      return `${notification.fromName} commented on your post: ${notification.postText}`;
    case NotificationType.PostTag:
      return `${notification.fromName} tagged you in a post: ${notification.postText}`;
    case NotificationType.CommentTag:
      return `${notification.fromName} tagged you in a comment: ${notification.commentText}`;
  }
};

const wrapper = (fn) => {
  return async (msg) => {
    try {
      await fn(msg);
    } catch (e) {
      logger.error(e);
    }
  };
};

const formatSingleNotification = (notification: SingleAddressNotification): NotificationViewModel => {
  return {
    type: notification.type,
    fromId: notification.from._id,
    fromName: notification.from.name,
    toId: notification.to._id,
    toName: notification.to.name,
    toDeviceId: notification.to.deviceId,
    postId: notification.postId,
    postText: notification.postText,
    commentId: notification.commentId,
    commentText: notification.commentText,
    etc: notification.etc,
  };
};

const formatMultiAddressNotification = (notification: MultiAddressNotification): NotificationViewModel[] => {
  return notification.to.map((to) => {
    return {
      type: notification.type,
      fromId: notification.from._id,
      fromName: notification.from.name,
      toId: to._id,
      toName: to.name,
      toDeviceId: to.deviceId,
      postId: notification.postId,
      postText: notification.postText,
      commentId: notification.commentId,
      commentText: notification.commentText,
      etc: notification.etc,
    };
  });
};

const singleAddressNotificationHandler = (msg) => {
  return wrapper(async () => {
    logger.silly('got single address notification: %o', msg.body);
    msg.ack();

    const notification: SingleAddressNotification = msg.body;

    const formattedNotification = formatSingleNotification(notification);
    formattedNotification.notificationText = getNotificationText(formattedNotification);

    const notificationService = Container.get(NotificationService);
    await notificationService.save(formattedNotification);

    const notificationSender = Container.get(NotificationSender);
    // await notificationSender.sendSingle(formattedNotification);
  })(msg);
};


const multiAddressNotificationHandler = (msg) => {
  return wrapper(async () => {
    logger.silly('got multi address notification: %o', msg.body);
    msg.ack();

    const notification: MultiAddressNotification = msg.body;

    const notifications = formatMultiAddressNotification(notification);
    const notificationService = Container.get(NotificationService);

    notifications.forEach((e) => {
      e.notificationText = getNotificationText(e);
    });

    await notificationService.saveBulk(notifications);

    const notificationSender = Container.get(NotificationSender);
    // await notificationSender.sendMultiple(notifications);
  })(msg);
};


export {singleAddressNotificationHandler, multiAddressNotificationHandler};
