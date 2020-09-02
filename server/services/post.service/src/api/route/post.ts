import {Router} from 'express';
import asyncMw from '../../util/AsyncMW';
import {Container} from 'typedi';
import {PostService} from '../../service/post';
import {IPost, PostSearch, UpsertPostRequest} from '../../interface/Post';
import {pageParser} from '../middleware/util';
import authenticate from '../middleware/authenticate';


const router = Router();

// router.use('/', (req, res, next) => {
//   // @ts-ignore
//   req.currentUser = {
//     _id: '5ebc4ef165f4ab9597d4aa1e',
//   };
//   next();
// });

router.use('/',
    pageParser,
    authenticate,
);


router.post('/',
    asyncMw(async (req, res, _) => {
      const postService = Container.get(PostService);
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
      const search: PostSearch = {userId: req.currentUser._id, ...req.query};
      res.send(await postService.searchPost(search));
    }));

router.get('/:postId',
    asyncMw(async (req, res, _) => {
      const postService = Container.get(PostService);
      res.json(await postService.getPostById(req.params.postId, req.currentUser._id));
    }));

router.put('/:postId',
    asyncMw(async (req, res, _) => {
      const postService = Container.get(PostService);
      const post: UpsertPostRequest = {...req.body, id: req.params.postId, authorId: req.currentUser._id};
      res.json(await postService.update(post));
    }));

router.post('/:postId/_upvote',
    asyncMw(async (req, res, _) => {
      const postService = Container.get(PostService);
      await postService.upVote(req.params.postId, req.currentUser._id);
      res.sendStatus(200);
    }));


router.post('/:postId/_downvote',
    asyncMw(async (req, res, _) => {
      const postService = Container.get(PostService);
      await postService.downVote(req.params.postId, req.currentUser._id);
      res.sendStatus(200);
    }));

router.post('/:postId/_unreact',
    asyncMw(async (req, res, _) => {
      const postService = Container.get(PostService);
      await postService.unReact(req.params.postId, req.currentUser._id);
      res.sendStatus(200);
    }));

router.post('/test/:userId',
    asyncMw(async (req, res, _) => {
      const postService = Container.get(PostService);
      res.json(await postService.filterReactedPosts(req.body.posts, req.params.userId, 'upvote'));
    }));


export {router as postRouter};
