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

  subscribers: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  }],

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
