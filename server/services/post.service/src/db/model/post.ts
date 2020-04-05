import {mongoose} from '../../db/config';

const post = new mongoose.Schema({
  author: String,
  type: String,
  body: String,
  tags: [String],
  category: String,
  upvoteCount: Number,

});


const PostModel = mongoose.model('post', post);


export {PostModel};
