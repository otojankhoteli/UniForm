import mongoose from 'mongoose';
import { IAuthenticatedUser } from '../../interface/authenticatedUser';


const authenticatedUser = new mongoose.Schema<IAuthenticatedUser>({
  refreshToken: String,
  expirationDate: Date,
  email: {
    type: String,
    unique: true,
    index: true,
  },
});

export default mongoose.model<IAuthenticatedUser & mongoose.Document>('AuthenticatedUser', authenticatedUser);
