import mongoose from 'mongoose';

const tag = new mongoose.Schema({
  value: String,
  body: String,
  tags: [String],
});


const TagModel = mongoose.model('Tag', tag);


export {tag, TagModel};
