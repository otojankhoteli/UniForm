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

router.post('/:postId/_upvote', asyncMw(async (req, res, _) => {
  const postService = Container.get(PostService);
  res.json(await postService.upVote(req.params.postId, req.body.userId));
}));

router.post('/:postId/_downvote', asyncMw(async (req, res, _) => {
  const postService = Container.get(PostService);
  res.json(await postService.downVote(req.params.postId, req.body.userId));
}));

router.post('/test/:userId', asyncMw(async (req, res, _) => {
  const postService = Container.get(PostService);
  res.json(await postService.filterUpVoted(req.body.posts, req.params.userId));
}));

export { router as postRouter };
