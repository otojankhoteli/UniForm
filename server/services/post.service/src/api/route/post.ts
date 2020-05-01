import {Router} from 'express';
import asyncMw from '../../util/AsyncMW';
import {Container} from 'typedi';
import {PostService} from '../../service/post';
import {IPost} from '../../interface/Post';
import {pageParser} from '../middleware/util';


const router = Router();

router.use('/', pageParser);

router.post('/', asyncMw(async (req, res, _) => {
  const postService = Container.get(PostService);
  const post: IPost = req.body;
  res.send(await postService.save(post));
}));

router.get('/hashtag', asyncMw(async (req, res, _) => {
  const postService = Container.get(PostService);
  res.send(await postService.getHashTags({...req.query}));
}));


export {router as postRouter};
