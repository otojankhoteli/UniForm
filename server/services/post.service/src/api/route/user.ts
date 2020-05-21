import {Router} from 'express';
import asyncMw from '../../util/AsyncMW';
import {IUser} from '../../interface/User';
import {UserService} from '../../service/user';
import {Container} from 'typedi';
import {PostService} from '../../service/post';
import {pageParser} from '../middleware/util';

const router = Router();

router.use('/', pageParser);


// api for test purposes, should not be directly used
router.post('/', asyncMw(async (req, res, _) => {
  const userService = Container.get(UserService);
  const user: IUser = req.body;
  res.send(await userService.save(user));
}));

router.get('/feed/:id', asyncMw(async (req, res, _) => {
  const postService = Container.get(PostService);

  // todo get from token
  const userId = req.params.id;
  res.send(await postService.getFeed(userId, req.query.skip, req.query.limit));
}));

export {router as userRouter};
