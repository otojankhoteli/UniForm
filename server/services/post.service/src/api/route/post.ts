import {Router} from 'express';
import asyncMw from '../../util/AsyncMW';
import {Container} from 'typedi';
import {PostService} from '../../service/post';
import {IPost, PostSearch, UpsertPostRequest} from '../../interface/Post';
import {pageParser} from '../middleware/util';
import authenticate from '../middleware/authenticate';


const router = Router();

router.use('/',
    pageParser,
    authenticate,
);


router.post('/',
    asyncMw(async (req, res, _) => {
      const postService = Container.get(PostService);
      // add token decode implementation
      const post: UpsertPostRequest = {...req.body, authorId: req.currentUser._id};
      res.json(await postService.save(post));
    }));


router.get('/hashtag',
    asyncMw(async (req, res, _) => {
      const postService = Container.get(PostService);
      res.send(await postService.getHashTags({...req.query}));
    }));

router.get('/search',
    asyncMw(async (req, res, _) => {
      const postService = Container.get(PostService);
      // const currentUser = req.params.user;
      const search: PostSearch = {userId: req.currentUser._id, ...req.query};
      res.send(await postService.searchPost(search));
    }));

router.get('/:postId',
    asyncMw(async (req, res, _) => {
      const postService = Container.get(PostService);
      res.json(await postService.getById(req.params.postId));
    }));

router.post('/:postId/_upvote',
    asyncMw(async (req, res, _) => {
      const postService = Container.get(PostService);
      res.json(await postService.upVote(req.params.postId, req.currentUser._id));
    }));


router.post('/:postId/_downvote',
    asyncMw(async (req, res, _) => {
      const postService = Container.get(PostService);
      res.json(await postService.downVote(req.params.postId, req.currentUser._id));
    }));


router.post('/test/:userId',
    asyncMw(async (req, res, _) => {
      const postService = Container.get(PostService);
      res.json(await postService.filterReactedPosts(req.body.posts, req.params.userId, 'upvote'));
    }));


export {router as postRouter};
