import logger from '../util/logger';
import {Container} from 'typedi';
import {NotificationService} from '../service/notification';
import {NotificationViewModel, SingleAddressNotification} from '../interface/Notification';
import {NotificationSender} from '../service/sender';

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
    whereId: notification.where._id,
    whereText: notification.where.text,
    etc: notification.etc,
  };
};

const notificationTemplate = (from, action, type, text) => {
  return `${from} ${action} on ${type}: ${text}`;
};

const reactNotification = (msg) => {
  return wrapper(async () => {
    logger.silly('got react notification: %o', msg.body);
    msg.ack();

    const notification: SingleAddressNotification = msg.body;

    const formattedNotification = formatSingleNotification(notification);
    formattedNotification.notificationText = notificationTemplate(formattedNotification.fromName, 'reacted', 'comment', formattedNotification.whereText);

    const notificationService = Container.get(NotificationService);
    await notificationService.save(formattedNotification);

    const notificationSender = Container.get(NotificationSender);
    const expoResp = await notificationSender.sendSingle(formattedNotification);
    console.log(expoResp);

    logger.silly('react notification created');
  })(msg);
};


const tagNotification = (msg) => {
  return wrapper(async () => {
    logger.silly('got tag notification: %o', msg.body);
    msg.ack();

    const notificationService = Container.get(NotificationService);
    // todo handle notification
  })(msg);
};

export {reactNotification, tagNotification};
