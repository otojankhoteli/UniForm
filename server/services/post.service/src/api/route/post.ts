import {Router} from 'express';
import asyncMw from '../../util/AsyncMW';
import {Container} from 'typedi';
import {PostService} from '../../service/post';


const router = Router();

router.post('/', asyncMw(async (req, res, _) => {
  const postService = Container.get(PostService);
  res.send(postService.test());
}));

export {router as postRouter};
