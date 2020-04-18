import mongoose from 'mongoose';
import {IHashTag} from '../../interface/HashTag';

const hashtag = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    index: true,
  },
  posts: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
});


const HashTagModel = mongoose.model<IHashTag & mongoose.Document>('Hashtag', hashtag);


export {HashTagModel};
