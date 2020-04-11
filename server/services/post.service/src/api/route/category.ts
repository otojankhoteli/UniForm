import {Router} from 'express';
import asyncMw from '../../util/AsyncMW';
import {Container} from 'typedi';
import {CategoryService} from '../../service/category';
import {ICategory, ICategorySearchModel} from '../../interface/Category';

const router = Router();


router.post('/', asyncMw(async (req, res, _) => {
  const categoryService = Container.get(CategoryService);
  // todo get user id from token
  const category: ICategory = {...req.body};
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


export {router as categoryRouter};
