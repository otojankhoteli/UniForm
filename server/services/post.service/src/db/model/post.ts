import mongoose from 'mongoose';
import {IPost} from '../../interface/Post';
import {votable} from './votable';


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
  }],

  userTags: [{
    type: String,
  }],

  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Category',
  },

  upVoters: [{
    type: mongoose.Schema.Types.ObjectId,
    index: true,
  }],

  downVoters: [{
    type: mongoose.Schema.Types.ObjectId,
    index: true,
  }],

  voteCount: {
    type: Number,
    required: true,
    default: 0,
  },
},
{timestamps: true});


const PostModel = mongoose.model<IPost & mongoose.Document>('Post', post);


export {PostModel};
