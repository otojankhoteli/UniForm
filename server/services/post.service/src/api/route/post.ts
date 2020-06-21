import { Router } from 'express';
import asyncMw from '../../util/AsyncMW';
import { Container } from 'typedi';
import { PostService } from '../../service/post';
import { IPost, UpsertPostRequest } from '../../interface/Post';
import { pageParser } from '../middleware/util';
import authenticate from '../middleware/authenticate';


const router = Router();

router.use('/', pageParser);

router.post('/', authenticate, asyncMw(async (req, res, _) => {
  const postService = Container.get(PostService);
  // add token decode implementation
  const post: UpsertPostRequest = { ...req.body, author: req.currentUser._id };
  res.send(await postService.save(post));
}));

router.get('/hashtag', asyncMw(async (req, res, _) => {
  const postService = Container.get(PostService);
  res.send(await postService.getHashTags({ ...req.query }));
}));

router.post('/:postId/_upvote', authenticate, asyncMw(async (req, res, _) => {
  const postService = Container.get(PostService);
  res.json(await postService.upVote(req.params.postId, req.currentUser._id));
}));

router.post('/:postId/_downvote', authenticate, asyncMw(async (req, res, _) => {
  const postService = Container.get(PostService);
  res.json(await postService.downVote(req.params.postId, req.currentUser._id));
}));

router.post('/test/:userId', asyncMw(async (req, res, _) => {
  const postService = Container.get(PostService);
  res.json(await postService.filterReactedPosts(req.body.posts, req.params.userId, 'upvote'));
}));


export { router as postRouter };
