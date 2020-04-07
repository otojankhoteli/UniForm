import { Router } from 'express';
import asyncMw from '../../util/AsyncMW';
import { Container } from 'typedi';
import { AuthService } from '../../service/auth';
import authenticate from '../middleware/authenticate';


const router = Router();

router.post('/sign', asyncMw(async (req, res, _) => {
  var authService = Container.get(AuthService);
  var { token, user } = await authService.logIn(req.body);
  res.json({ token, user });
}));

router.get('/test', authenticate, (req, res, next) => {
  console.log(res.json);
})

export { router as authRouter };