import {Router} from 'express';
import asyncMw from '../../util/AsyncMW';
import {Container} from 'typedi';
import {CategoryService} from '../../service/category';
import {ICategoryDTO, ICategorySearchModel} from '../../interface/Category';
import {PostService} from '../../service/post';
import {pageParser} from '../middleware/util';
import {UserService} from '../../service/user';
import authenticate from '../middleware/authenticate';

const router = Router();

router.use('/', pageParser);

router.post('/',
    authenticate,
    asyncMw(async (req, res, _) => {
      const categoryService = Container.get(CategoryService);
      const userId = req.currentUser._id;
      const category: ICategoryDTO = {...req.body, author: userId};
      res.send(await categoryService.save(category));
    }));

router.get('/',
    // authenticate,
    asyncMw(async (req, res, _) => {
      const categoryService = Container.get(CategoryService);
      const searchModel: ICategorySearchModel = {...req.query};
      const userId = req.currentUser._id;
      // const userId = '5ebfd7a5c2be538124b18cd7';
      const result: ICategoryDTO[] = searchModel?.name ?
    (await categoryService.findByPrefix(searchModel, userId)) :
    (await categoryService.findTop(searchModel, userId));
      res.send(result);
    }));

router.get('/posts', asyncMw(async (req, res, _) => {
  const postService = Container.get(PostService);
  res.send(await postService.getCategoryPosts({...req.query}));
}));

router.post('/:id/_subscribe',
    authenticate,
    asyncMw(async (req, res, _) => {
      const userService = Container.get(UserService);
      res.status(204)
          .send(await userService.subscribe(req.currentUser._id, req.params.id));
    }));

router.post('/:id/_unsubscribe',
    authenticate,
    asyncMw(async (req, res, _) => {
      const userService = Container.get(UserService);
      res.status(204)
          .send(await userService.unsubscribe(req.currentUser._id, req.params.id));
    }));


export {router as categoryRouter};
