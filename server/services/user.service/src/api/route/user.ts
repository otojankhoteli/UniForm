import { Router } from 'express';
import asyncMw from '../middleware/AsyncMW';
import { Container } from 'typedi';
import { UserSearchOptions } from '../../interface/user ';
import { UserService } from '../../service/user';
import { pageParser } from '../middleware/util';

const router = Router();
router.use('/', pageParser);

router.get('/', asyncMw(async (req, res, _) => {
  const userService = Container.get(UserService);
  const searchOptions: UserSearchOptions = {...req.query};
  const result = await userService.get(searchOptions);

  res.send(result);
}));


export { router as userRouter };
