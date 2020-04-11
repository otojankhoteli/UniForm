import {Router} from 'express';
import asyncMw from '../../util/AsyncMW';
import {IUser} from '../../interface/User';
import {UserService} from '../../service/user';
import {Container} from 'typedi';

const router = Router();

// api for test purposes, should not be directly used
router.post('/', asyncMw(async (req, res, _) => {
  const userService = Container.get(UserService);
  const user: IUser = req.body;
  res.send(await userService.save(user));
}));

export {router as userRouter};
