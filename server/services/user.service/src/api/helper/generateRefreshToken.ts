import {config} from '../../config/index';
import randomString from 'randomstring';

export default (): string => {
  const refreshToken = randomString.generate(config.authentication.refreshTokenLength);
  return refreshToken;
};
