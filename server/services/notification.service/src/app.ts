import express from 'express';
import errorHandler from './util/error/ErrorHandler';
import initDIContainer from './util/dependencyInjector';
import {config} from './config';
import logger from './util/logger';
import {connectDb} from './db/mongo.connect';
import {connectRabbit} from './message.queue';



const startApp = async () => {
  try {
    // initDIContainer();
    // await connectDb();
    // await connectRabbit();
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.get('/ping', (req, res, next) => {
      res.send('pong');
    });


    app.use(errorHandler);

    app.listen(config.port, () => {
      logger.info(`listening on port ${config.port}`);
    });
  } catch (e) {
    logger.error('Could not start application %o', e);
    process.exit(1);
  }
};

startApp();
