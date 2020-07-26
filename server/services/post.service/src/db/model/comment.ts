import mongoose from 'mongoose';
import {IPost} from '../../interface/Post';
import {votable} from './votable';

const comment = new mongoose.Schema({
  ...votable,

  text: {
    type: String,
    required: true,
  },

  userTags: [{
    type: String,
  }],

  post: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Post',
  },
},
{timestamps: true});

comment.index({text: 'text'});

const CommentModel = mongoose.model<IPost & mongoose.Document>('Comment', comment);


export {CommentModel};
