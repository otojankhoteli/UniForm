import mongoose from 'mongoose';
import {IUser} from '../../interface/User';

const user = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a full name'],
    index: true,
  },

  email: {
    type: String,
    unique: true,
    index: true,
  },

  imgUrl: {
    type: String,
  },

  role: {
    type: String,
    default: 'user',
  },
});


const UserModel = mongoose.model<IUser & mongoose.Document>('User', user);


export {user, UserModel};
