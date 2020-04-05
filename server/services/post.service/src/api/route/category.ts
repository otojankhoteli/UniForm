import {Router} from 'express';
import asyncMw from '../../util/AsyncMW';
import {CategoryService} from '../../service/category';
const router = Router();

router.post('/', asyncMw(async (req, res, _) => {
  const cat = new CategoryService;
  console.log('ere');
  console.log(req.body);
  await cat.save(req.body);
  res.send(cat.test());
}));

export {router as categoryRouter};
