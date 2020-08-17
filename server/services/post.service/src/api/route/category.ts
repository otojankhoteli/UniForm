import { Router } from 'express';
import asyncMw from '../../util/AsyncMW';
import { Container } from 'typedi';
import { CategoryService } from '../../service/category';
import { ICategoryDTO, ICategorySearchModel } from '../../interface/Category';
import { PostService } from '../../service/post';
import { pageParser } from '../middleware/util';
import { UserService } from '../../service/user';
import authenticate from '../middleware/authenticate';

const router = Router();

router.use('/', pageParser);

router.post('/', asyncMw(async (req, res, _) => {
  const categoryService = Container.get(CategoryService);
  // todo get user id from token
  const category: ICategoryDTO = { ...req.body };
  res.send(await categoryService.save(category));
}));

router.get('/', asyncMw(async (req, res, _) => {
  const categoryService = Container.get(CategoryService);
  const searchModel: ICategorySearchModel = { ...req.query };
  const result = searchModel?.name ?
    (await categoryService.findByPrefix(searchModel)) :
    (await categoryService.findTop(searchModel));
  res.send(result);
}));

router.get('/posts', asyncMw(async (req, res, _) => {
  const postService = Container.get(PostService);
  res.send(await postService.getCategoryPosts({ ...req.query }));
}));

router.post('/:id/_subscribe',
  // authenticate,
  asyncMw(async (req, res, _) => {
  const userService = Container.get(UserService);
  res.send(await userService.subscribe(req.currentUser._id, req.params.id));
}));

router.post('/:id/_unsubscribe',
  // authenticate,
  asyncMw(async (req, res, _) => {
  const userService = Container.get(UserService);
  // todo get userId from token
  res.send(await userService.unsubscribe(req.currentUser._id, req.params.id));
}));


export { router as categoryRouter };
