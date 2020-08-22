import {Inject, Service} from 'typedi';
import {Document, Model} from 'mongoose';
import {NotificationViewModel} from '../interface/Notification';
import {Expo} from 'expo-server-sdk';


@Service()
export class NotificationSender {
  private expo;
  private messages;
  private MESSAGES_LIMIT = 1;

  constructor() {
    this.expo = new Expo();
    this.messages = [];
  }

  private constructExpoMessage(msg: NotificationViewModel) {
    return {
      // title: 'UniForm',
      to: msg.toDeviceId,
      body: msg.notificationText,
      data: msg,
    };
  }


  // public async send(msg: NotificationViewModel) {
  //   if (this.messages.length < this.MESSAGES_LIMIT) {
  //     this.messages.push(this.constructExpoMessage(msg));
  //   }
  //
  //   return this.expo.sendPushNotificationsAsync({
  //
  //   });
  // }

  public async sendSingle(msg: NotificationViewModel) {
    const expoMessage = this.constructExpoMessage(msg);
    if (Expo.isExpoPushToken(expoMessage.to)) {
      return this.expo.sendPushNotificationsAsync([expoMessage]);
    }
    throw new Error('Sending notification failed, invalid expo token');
  }

  public async sendMultiple(messages: NotificationViewModel[]) {
    const expoMessages = messages.map(this.constructExpoMessage);
    return this.expo.sendPushNotificationsAsync(expoMessages);
  }

  public async test() {
    const receipts = await this.expo.getPushNotificationReceiptsAsync(['66de0520-6f69-4fdb-b5bc-2eb31d2eba31', '58536222-4e1e-47fd-803b-161422ca1e81', '5a6c7928-226f-4c42-9fb7-f70a4a213d84']);
    console.log(receipts);
    return receipts;
  }
}
