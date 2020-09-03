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

  text: {
    type: String,
    required: true,
  },

  files: [{
    type: String,
  }],

  hashTags: [{
    type: String,
    index: true,
    default: [],
  }],

  userTags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true,
  }],

  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Category',
  },

  upVoters: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    default: [],
  }],

  downVoters: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    default: [],
  }],

  voteCount: {
    type: Number,
    required: true,
    default: 0,
  },

  commentCount: {
    type: Number,
    required: true,
    default: 0,
  },
},
{timestamps: true});

post.index({text: 'text'});

const PostModel = mongoose.model<IPost & mongoose.Document>('Post', post);


export {PostModel};
