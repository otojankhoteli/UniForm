import  mongoose  from 'mongoose';
import { IUser } from '../../interface/user';


const user = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Please enter a full name'],
    index: true,
  },

  email: {
    type: String,
    unique: true,
    index: true,
  },

  role: {
    type: String,
    default: 'user',
  },
});

export default mongoose.model<IUser & mongoose.Document>('User', user);
