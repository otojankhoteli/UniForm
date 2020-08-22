import {Router} from 'express';
import asyncMw from '../../util/AsyncMW';
import {Container} from 'typedi';
import {NotificationService} from '../../service/notification';
import authenticate from '../middleware/authenticate';

const router = Router();

router.get('/',
    // authenticate,
    asyncMw(async (req, res, _) => {
      const notificationService = Container.get(NotificationService);
      const currentUser = req.currentUser._id;
      // const currentUser = '5ebc4ef165f4ab9597d4aa1e';
      res.json(await notificationService.getNotificationsOf(currentUser, parseInt(req.query.skip), parseInt(req.query.limit)));
    }));


export {router as notificationRouter};
