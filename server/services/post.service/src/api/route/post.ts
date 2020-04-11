import {Router} from 'express';
import asyncMw from '../../util/AsyncMW';


const router = Router();

router.post('/', asyncMw(async (req, res, _) => {

}));

export {router as postRouter};
