import {Router} from 'express';
import asyncMw from '../../util/AsyncMW';
import {Container} from 'typedi';
import {CommentService} from '../../service/comment';
import {IComment, UpsertCommentRequest} from '../../interface/Comment';
import {pageParser} from '../middleware/util';
import authenticate from '../middleware/authenticate';


const router = Router();

router.use('/',
    pageParser,
    authenticate,
);


router.get('/', asyncMw(async (req, res, _) => {
  const commentService = Container.get(CommentService);
  const userId = req.currentUser._id;
  res.send(await commentService.getPostComments({
    userId,
    postId: req.query.postId,
    skip: req.query.skip,
    limit: req.query.limit,
  }));
}));

router.get('/:commentId', asyncMw(async (req, res, _) => {
  const commentService = Container.get(CommentService);
  const userId = req.currentUser._id;
  res.send(await commentService.getCommentById(req.params.commentId, userId));
}));

router.post('/', asyncMw(async (req, res, _) => {
  const commentService = Container.get(CommentService);
  const userId = req.currentUser._id;
  const comment: UpsertCommentRequest = {...req.body, authorId: userId};
  res.send(await commentService.save(comment));
}));

router.put('/:commentId', asyncMw(async (req, res, _) => {
  const commentService = Container.get(CommentService);
  const userId = req.currentUser._id;
  const comment: UpsertCommentRequest = {
    ...req.body,
    authorId: userId,
    id: req.params.commentId,
  };
  res.send(await commentService.update(comment));
}));

router.post('/:commentId/_upvote', asyncMw(async (req, res, _) => {
  const commentService = Container.get(CommentService);
  const userId = req.currentUser._id;
  await commentService.upVote(req.params.commentId, userId);
  res.sendStatus(200);
}));

router.post('/:commentId/_downvote', asyncMw(async (req, res, _) => {
  const commentService = Container.get(CommentService);
  const userId = req.currentUser._id;
  await commentService.downVote(req.params.commentId, userId);
  res.sendStatus(200);
}));

router.post('/:commentId/_unreact',
    asyncMw(async (req, res, _) => {
      const commentService = Container.get(CommentService);
      const userId = req.currentUser._id;
      await commentService.unReact(req.params.commentId, userId);
      res.sendStatus(200);
    }));

export {router as commentRouter};
