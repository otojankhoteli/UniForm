import mongoose from 'mongoose';
import {IHashTag} from '../../interface/HashTag';

const hashtag = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    index: true,
  },
});


const HashTagModel = mongoose.model<IHashTag & mongoose.Document>('Hashtag', hashtag);


export {HashTagModel};
