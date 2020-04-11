import mongoose from 'mongoose';
import {ICategory} from '../../interface/Category';

const category = new mongoose.Schema<ICategory>({
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  name: String,
  memberCount: Number,
  image: String,
  isMain: Boolean,
},
{timestamps: true});


export default mongoose.model<ICategory & mongoose.Document>('Category', category);
