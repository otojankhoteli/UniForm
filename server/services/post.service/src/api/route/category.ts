import {Router} from 'express';
import asyncMw from '../../util/AsyncMW';
import {Container} from 'typedi';
import {CategoryService} from '../../service/category';
import {ICategoryDTO, ICategorySearchModel} from '../../interface/Category';
import {PostService} from '../../service/post';

const router = Router();


router.post('/', asyncMw(async (req, res, _) => {
  const categoryService = Container.get(CategoryService);
  // todo get user id from token
  const category: ICategoryDTO = {...req.body};
  res.send(await categoryService.save(category));
}));

router.get('/search', asyncMw(async (req, res, _) => {
  const categoryService = Container.get(CategoryService);
  const searchModel: ICategorySearchModel = {...req.query};
  const result = searchModel?.name ?
      (await categoryService.findByPrefix(searchModel)) :
      (await categoryService.findTop(searchModel));
  res.send(result);
}));

router.get('/posts', asyncMw(async (req, res, _) => {
  // todo get category posts
  const postService = Container.get(PostService);
}));


export {router as categoryRouter};
