import mongoose from 'mongoose';
import {IUser} from '../../interface/User';

const user = new mongoose.Schema({
  name: String,
  email: String,
  tags: [String],
  imgUrl: String,
  isAdmin: Boolean,
});


const UserModel = mongoose.model<IUser & mongoose.Document>('User', user);


export {user, UserModel};
