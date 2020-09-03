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

router.use('/',
    pageParser,
    authenticate,
);

router.post('/',
    asyncMw(async (req, res, _) => {
      const categoryService = Container.get(CategoryService);
      const userId = req.currentUser._id;
      const category: ICategoryDTO = {...req.body, author: userId};
      res.send(await categoryService.save(category));
    }));

router.get('/posts',
    asyncMw(async (req, res, _) => {
      const postService = Container.get(PostService);
      const userId = req.currentUser._id;
      res.send(await postService.getCategoryPosts({...req.query, userId}));
    }));

router.get('/subscriptions',
    asyncMw(async (req, res, _) => {
      const categoryService = Container.get(CategoryService);
      const userId = req.currentUser._id;
      res.send(await categoryService.getSubscriptionsOf({profileId: req.query.profileId, userId}));
    }));

router.get('/:id',
    asyncMw(async (req, res, _) => {
      const categoryService = Container.get(CategoryService);
      const userId = req.currentUser._id;
      res.send(await categoryService.findById(req.params.id, userId));
    }));

router.get('/',
    asyncMw(async (req, res, _) => {
      const categoryService = Container.get(CategoryService);
      const searchModel: ICategorySearchModel = {...req.query};
      const userId = req.currentUser._id;
      const result: ICategoryDTO[] = searchModel?.name ?
    (await categoryService.findByPrefix(searchModel, userId)) :
    (await categoryService.findTop(searchModel, userId));
      res.send(result);
    }));

router.post('/:id/_subscribe',
    asyncMw(async (req, res, _) => {
      const userService = Container.get(UserService);
      res.status(204)
          .send(await userService.subscribe(req.currentUser._id, req.params.id));
    }));

router.post('/:id/_unsubscribe',
    asyncMw(async (req, res, _) => {
      const userService = Container.get(UserService);
      res.status(204)
          .send(await userService.unsubscribe(req.currentUser._id, req.params.id));
    }));

export {router as categoryRouter};
