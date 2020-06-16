import mongoose from 'mongoose';

const notification = new mongoose.Schema({
  type: {
    type: String,
  },

  deviceId: {
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

  etc: {},

},
{timestamps: true});


const NotificationModel = mongoose.model<mongoose.Document>('Notification', notification);
