import { Router } from 'express';
import asyncMw from '../../util/AsyncMW';
import { Container } from 'typedi';
import { PostService } from '../../service/post';
import { IPost, UpsertPostRequest } from '../../interface/Post';
import { pageParser } from '../middleware/util';


const router = Router();

router.use('/', pageParser);

router.post('/', asyncMw(async (req, res, _) => {
  const postService = Container.get(PostService);
  // add token decode implementation
  const post: UpsertPostRequest = { ...req.body, author: "take from token" };
  res.send(await postService.save(post));
}));

router.get('/hashtag', asyncMw(async (req, res, _) => {
  const postService = Container.get(PostService);
  res.send(await postService.getHashTags({ ...req.query }));
}));


export { router as postRouter };
