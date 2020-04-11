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
    required: true,
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

  image: String,

  isMain: {
    type: Boolean,
    default: false,
  },
},
{timestamps: true});


export default mongoose.model<ICategoryDTO & mongoose.Document>('Category', category);
