import mongoose from 'mongoose';
import {IUser} from '../../interface/User';

const user = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a full name'],
    index: true,
  },

  deviceId: {
    type: String,
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

  voteCount: {
    type: Number,
    required: true,
    default: 0,
  },

  subscribedCategories: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true,
    ref: 'Category',
  }],

  // upVotedPosts: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: 'Post',
  // }],
});


const UserModel = mongoose.model<IUser & mongoose.Document>('User', user);


export {user, UserModel};
