import mongoose from 'mongoose';
import {IPost} from '../../interface/Post';

const post = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },

  type: {
    type: String,
    required: true,
  },

  body: {
    type: String,
    required: true,
  },

  hashTags: [{
    type: String,
    index: true,
  }],

  userTags: [{
    type: String,
  }],

  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Category',
  },

  voteCount: {
    type: Number,
    required: true,
    default: 0,
  },
},
{timestamps: true});


const PostModel = mongoose.model<IPost & mongoose.Document>('Post', post);


export {PostModel};
