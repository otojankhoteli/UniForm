import {Router} from 'express';
import asyncMw from '../../util/AsyncMW';
import {Container} from 'typedi';
import {CommentService} from '../../service/comment';
import {IComment, UpsertCommentRequest} from '../../interface/Comment';
import {pageParser} from '../middleware/util';


const router = Router();

router.use('/', pageParser);

router.get('/', asyncMw(async (req, res, _) => {
  const commentService = Container.get(CommentService);
  // const userId = req.currentUser._id;
  const userId = '5ebfd7a5c2be538124b18cd7';
  res.send(await commentService.getPostComments({
    userId,
    postId: req.query.postId,
    skip: req.query.skip,
    limit: req.query.limit,
  }));
}));

router.get('/:commentId', asyncMw(async (req, res, _) => {
  const commentService = Container.get(CommentService);
  // const userId = req.currentUser._id;
  const userId = '5ebfd7a5c2be538124b18cd7';
  res.send(await commentService.getCommentById(req.params.commentId, userId));
}));

router.post('/', asyncMw(async (req, res, _) => {
  const commentService = Container.get(CommentService);
  // const userId = req.currentUser._id;
  const userId = '5ebfd7a5c2be538124b18cd7';
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
  res.json(await commentService.upVote(req.params.commentId, userId));
}));

router.post('/:commentId/_downvote', asyncMw(async (req, res, _) => {
  const commentService = Container.get(CommentService);
  const userId = req.currentUser._id;
  res.json(await commentService.downVote(req.params.commentId, userId));
}));

export {router as commentRouter};
