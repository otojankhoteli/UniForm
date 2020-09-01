import { Router } from 'express';
import asyncMw from '../middleware/AsyncMW';
import { Container } from 'typedi';
import { AuthService } from '../../service/auth';
import authenticate from '../middleware/authenticate';
import { generateToken } from '../helper/token';
import extractGoogleToken from '../helper/extractGoogleToken';
import { generateRefreshToken, decodeRefreshToken } from '../helper/refreshToken';

const router = Router();

router.post('/signup', asyncMw(async (req, res, _) => {
  const googleUser = await extractGoogleToken(req.body.accessToken);
  const deviceId = req.body.deviceId;

  const authService = Container.get(AuthService);
  const user = await authService.logIn({ ...googleUser, deviceId });

  const token = generateToken(user);
  const refreshToken = generateRefreshToken(user);

  res.json({ user, token, refreshToken });
}));

router.post('/refresh', asyncMw(async (req, res, _) => {
  const refreshToken = req.body.refreshToken;
  const user = decodeRefreshToken(refreshToken);
  const token = generateToken(user);
  res.json({ user, token, refreshToken });
}));

router.get('/test', authenticate, (req, res, _) => {
  res.json(req.currentUser);
});

export { router as authRouter };
