import {Router} from 'express';
import asyncMw from '../../util/AsyncMW';
import { Container } from 'typedi';


const router = Router();

router.post('/sign', asyncMw(async (req, res, _) => {

}));


export {router as authRouter};