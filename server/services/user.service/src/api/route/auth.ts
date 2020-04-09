import { Router } from 'express';
import asyncMw from '../middleware/AsyncMW';
import { Container } from 'typedi';
import { AuthService } from '../../service/auth';
import authenticate from '../middleware/authenticate';
import generateToken from '../helper/generateToken';
import generateRefreshToken from '../helper/generateRefreshToken';
import decodeToken from '../helper/decodeToken';


const router = Router();
//TODO
router.post('/signup', asyncMw(async (req, res, _) => {
  const authService = Container.get(AuthService);
  const refreshToken = generateRefreshToken();
  const { user, authenticatedUser } = await authService.logIn({ ...req.body, refreshToken });//TODO change body to token
  const token = generateToken(user);
  res.json({ user, token, refreshToken });
}));

router.post('/refreshToken', asyncMw(async (req, res, _) => {
  const authService = Container.get(AuthService);
  const { oldToken, refreshToken } = req.body;
  const user = decodeToken(oldToken);

  await authService.validateTokenRefresh(refreshToken, user);
  const token = generateToken(user);
  res.json({ user, token, refreshToken })
}));

router.get('/test', authenticate, (req, res, next) => {
  console.log(res.json);
})

export { router as authRouter };
