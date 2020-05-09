import 'reflect-metadata';
import express from 'express';
import logger from './util/logger';
import errorHandler from './util/error/ErrorHandler';
import {connectDb} from './db/mongo.connect';
import {config} from './config/index';
import initDIContainer from './util/dependencyInjector';
import {fileRouter} from './api/file';


const startApp = async () => {
  try {
    await connectDb();
    initDIContainer();
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.get('/ping', (req, res, next) => {
      res.send('pong');
    });

    app.use('/files', fileRouter);
    app.use(errorHandler);

    app.listen(config.port, () => {
      logger.info(`blob.service listening on port ${config.port}`);
    });
  } catch (e) {
    logger.error('Could not start application %o', e);
    process.exit(1);
  }
};

startApp();
