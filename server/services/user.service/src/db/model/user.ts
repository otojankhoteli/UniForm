import {mongoose} from '../mongo.connection';


const user = new mongoose.Schema({
  email: String,
  username: String,
});


const UserModel = mongoose.model('user', user);


export {UserModel};
