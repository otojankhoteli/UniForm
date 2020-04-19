import {Router} from 'express';
import asyncMw from '../../util/AsyncMW';
import {IHashTag} from '../../interface/HashTag';
import logger from '../../util/logger';
import {Container} from 'typedi';
import {HashTagService} from '../../service/hashtag';

const router = Router();

// api for test purposes, should not be directly used
router.post('/', asyncMw(async (req, res, _) => {
  logger.silly('saving hashtags');
  const hashTagService = Container.get(HashTagService);
  const hashTag: string[] = req.body.hashTags;
  res.send(await hashTagService.save(hashTag));
}));

router.get('/', asyncMw(async (req, res, _) => {
  logger.debug('getting hashtag; requested options %o', req.query);
  // res.send(await )
}));

export {router as hashTagRouter};
