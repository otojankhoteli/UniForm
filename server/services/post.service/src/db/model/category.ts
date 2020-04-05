import {mongoose} from '../../db/config';

const category = new mongoose.Schema({
  author: String,
  type: String,
  body: String,
  tags: [String],
  category: String,
  upvoteCount: Number,

});


const CategoryModel = mongoose.model('category', category);


export {CategoryModel};
