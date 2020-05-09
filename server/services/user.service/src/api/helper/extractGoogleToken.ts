import { IUser } from '../../interface/user ';
import { google } from 'googleapis';

export default async (accessToken: string): Promise<IUser> => {
  const OAuth2 = google.auth.OAuth2;
  const oauth2Client = new OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });
  const oauth2 = google.oauth2({
    auth: oauth2Client,
    version: 'v2',
  });
  const userInfo = await oauth2.userinfo.get();

  const user = {
    name: userInfo.data.given_name,
    surname: userInfo.data.family_name,
    email: userInfo.data.email,
    photoURL: userInfo.data.picture,
  } as IUser;
  return user;
};
