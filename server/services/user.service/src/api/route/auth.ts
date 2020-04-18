import { Router } from 'express';
import asyncMw from '../middleware/AsyncMW';
import { Container } from 'typedi';
import { AuthService } from '../../service/auth';
import authenticate from '../middleware/authenticate';
import generateToken from '../helper/generateToken';
import generateRefreshToken from '../helper/generateRefreshToken';
import decodeToken from '../helper/decodeToken';
import extractGoogleToken from '../helper/extractGoogleToken';


const router = Router();
//TODO
router.post('/signup', asyncMw(async (req, res, _) => {
  const authService = Container.get(AuthService);
  const googleUser = await extractGoogleToken(req.body.accessToken);
  const refreshToken = generateRefreshToken();
  const user = await authService.logIn({ ...googleUser, refreshToken });//TODO change body to token
  const token = generateToken(user);
  res.json({ user, token, refreshToken });
}));

router.post('/refresh', asyncMw(async (req, res, _) => {
  const authService = Container.get(AuthService);
  const { expiredToken, refreshToken } = req.body;
  const user = decodeToken(expiredToken);

  await authService.validateTokenRefresh(refreshToken, user);
  const token = generateToken(user);
  console.log(token);
  res.json({ user, token, refreshToken })
}));

router.get('/test', authenticate, (req, res, next) => {
  console.log(res.json);
})

export { router as authRouter };
