import {Router} from 'express';
import asyncMw from '../../util/AsyncMW';
import {Container} from 'typedi';
import {CommentService} from '../../service/comment';
import {IComment, UpsertCommentRequest} from '../../interface/Comment';
import {pageParser} from '../middleware/util';


const router = Router();

router.use('/', pageParser);

router.post('/', asyncMw(async (req, res, _) => {
  const commentService = Container.get(CommentService);
  // add token decode implementation
  const Comment: UpsertCommentRequest = {...req.body, author: 'take from token'};
  res.send(await commentService.save(Comment));
}));

router.get('/hashtag', asyncMw(async (req, res, _) => {
  const commentService = Container.get(CommentService);
  res.send(await commentService.getHashTags({...req.query}));
}));

router.post('/:commentId/_upvote', asyncMw(async (req, res, _) => {
  const commentService = Container.get(CommentService);
  res.json(await commentService.upVote(req.params.commentId, req.body.userId));
}));

router.post('/:commentId/_downvote', asyncMw(async (req, res, _) => {
  const commentService = Container.get(CommentService);
  res.json(await commentService.downVote(req.params.commentId, req.body.userId));
}));

export {router as commentRouter};
