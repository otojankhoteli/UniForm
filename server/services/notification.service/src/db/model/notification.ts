import mongoose from 'mongoose';
import {NotificationViewModel} from '../../interface/Notification';

const notification = new mongoose.Schema({
  type: {
    type: String,
  },
  fromId: {
    type: String,
  },
  fromName: {
    type: String,
  },
  toId: {
    type: String,
  },
  toName: {
    type: String,
  },
  toDeviceId: {
    type: String,
  },
  whereId: {
    type: String,
  },
  whereText: {
    type: String,
  },
  notificationText: {
    type: String,
  },
  seen: {
    type: Boolean,
  },
  etc: {},
},
{timestamps: true});


export const NotificationModel = mongoose.model<NotificationViewModel & mongoose.Document>('Notification', notification);
