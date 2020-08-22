import mongoose from 'mongoose';
import {IPost} from '../../interface/Post';
import {IComment} from '../../interface/Comment';

const comment = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },

  text: {
    type: String,
    required: true,
  },

  userTags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true,
  }],

  post: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Post',
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
},
{timestamps: true});

comment.index({text: 'text'});

const CommentModel = mongoose.model<IComment & mongoose.Document>('Comment', comment);


export {CommentModel};
