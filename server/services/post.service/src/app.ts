import 'reflect-metadata'; // We need this in order to use @DecoratorsGET
import express from 'express';
import logger from './util/logger';
import errorHandler from './util/error/ErrorHandler';
import {categoryRouter} from './api/route/category';
import {connectDb} from './db/mongo.connect';
import {config} from './config/index';
import initDIContainer from './util/dependencyInjector';
import {userRouter} from './api/route/user';
import {postRouter} from './api/route/post';
import {connectRabbit} from './message.queue';


const startApp = async () => {
  try {
    initDIContainer();
    await connectDb();
    await connectRabbit();
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.get('/ping', (req, res, next) => {
      res.send('pong');
    });

    app.use('/category', categoryRouter);
    app.use('/post', postRouter);
    app.use('/user', userRouter);
    app.use(errorHandler);

    app.listen(config.port, () => {
      logger.info(`post.service listening on port ${config.port}`);
    });
  } catch (e) {
    logger.error('Could not start application %o', e);
    process.exit(1);
  }
};

startApp();
