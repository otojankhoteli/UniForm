import {Router} from 'express';
import asyncMw from '../../util/AsyncMW';
import {IUser} from '../../interface/User';
import {UserService} from '../../service/user';
import {Container} from 'typedi';
import {PostService} from '../../service/post';
import {pageParser} from '../middleware/util';
import authenticate from '../middleware/authenticate';
import {CommentService} from '../../service/comment';

const router = Router();

router.use('/', pageParser);


// api for test purposes, should not be directly used
router.post('/', asyncMw(async (req, res, _) => {
  const userService = Container.get(UserService);
  const user: IUser = req.body;
  res.json(await userService.save(user));
}));

router.get('/feed',
    authenticate,
    asyncMw(async (req, res, _) => {
      const postService = Container.get(PostService);

      // todo get from token
      const userId = req.currentUser._id;
      res.json(await postService.getFeed(userId, req.query.skip, req.query.limit));
    }));

router.get('/activity/posts',
    authenticate,
    asyncMw(async (req, res, _) => {
      const postService = Container.get(PostService);
      const userId = req.currentUser._id;
      res.json(await postService.getPostsOf({userId, skip: req.query.skip, limit: req.query.limit}));
    }));

router.get('/activity/comments',
    authenticate,
    asyncMw(async (req, res, _) => {
      const commentService = Container.get(CommentService);
      const userId = req.currentUser._id;
      res.json(await commentService.getCommentsOf({userId, skip: req.query.skip, limit: req.query.limit}));
    }));

// router.get('/feed/:id',
//   // authenticate,
//   asyncMw(async (req, res, _) => {
//     const postService = Container.get(PostService);
//
//     // todo get from token
//     // const userId = req.currentUser._id;
//     const userId = req.params.id;
//
//     res.send(await postService.getFeed(userId, req.query.skip, req.query.limit));
//   }));


export {router as userRouter};
