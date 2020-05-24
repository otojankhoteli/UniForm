import mongoose from 'mongoose';
import {IUser} from '../../interface/User';

const votable = {
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },

  upVoters: [{
    type: String,
    index: true,
  }],

  downVoters: [{
    type: String,
    index: true,
  }],

  voteCount: {
    type: Number,
    required: true,
    default: 0,
  },
};

export {votable};
