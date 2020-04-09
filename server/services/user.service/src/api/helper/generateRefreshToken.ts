import { config } from '../../config/index';
import randomString from 'randomstring';

export default (): string => {
  let refreshToken = randomString.generate(config.authentication.refreshTokenLength);
  return refreshToken;
}