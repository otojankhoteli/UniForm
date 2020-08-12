import mongoose from 'mongoose';
import {INotification} from '../../interface/Notification';

const notification = new mongoose.Schema({
  type: {
    type: String,
  },

  from: {
    _id: {
      type: String,
    },
    name: {
      type: String,
    },
  },

  to: {
    _id: {
      type: String,
    },
    name: {
      type: String,
    },
    deviceId: {
      type: String,
    },
  },

  where: {
    _id: {
      type: String,
    },
    text: {
      type: String,
    },
  },

  etc: {},

},
{timestamps: true});


export const NotificationModel = mongoose.model<INotification & mongoose.Document>('Notification', notification);
