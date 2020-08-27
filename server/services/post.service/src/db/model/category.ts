import mongoose from 'mongoose';
import {ICategoryDTO} from '../../interface/Category';

const category = new mongoose.Schema<ICategoryDTO>({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },

  name: {
    type: String,
    unique: true,
    required: true,
  },

  description: {
    type: String,
  },

  memberCount: {
    type: Number,
    required: true,
    default: 0,
  },

  postCount: {
    type: Number,
    required: true,
    default: 0,
  },

  imgUrl: {
    type: String,
  },

  isVerified: {
    type: Boolean,
    default: false,
  },
},
{timestamps: true});


export default mongoose.model<ICategoryDTO & mongoose.Document>('Category', category);
