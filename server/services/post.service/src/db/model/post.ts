import mongoose from 'mongoose';

const post = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  type: String,
  body: String,
  tags: [String],
  category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
  voteCount: Number,
},
{timestamps: true});


const PostModel = mongoose.model('Post', post);


export {PostModel};
