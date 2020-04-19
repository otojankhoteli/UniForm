import 'reflect-metadata'; // We need this in order to use @Decorators
import express from 'express';
import logger from './util/logger';
import errorHandler from './util/error/ErrorHandler';
import {config} from './config';
import fillContainer from './util/dependencyInjector';
import {authRouter} from './api/route/auth';
import openMongoConnection from './db/mongo.connection';
import {connectRabbit} from './message.queue';
import {registerHandlers} from './subscriber/handler';
import {Emitter} from 'event-emitter';
import {Container} from 'typedi';
import {Events} from './subscriber/event';

const startApp = async () => {
  try {
    const app = express();

    fillContainer();


    await openMongoConnection();
    registerHandlers();
    await connectRabbit();


    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    app.get('/ping', (req, res, next) => {
      res.send('pong');
    });
    app.use('/auth', authRouter);

    app.use(errorHandler);

    app.listen(config.port, () => {
      logger.info(`user.service listening on port ${config.port}`);
    });
  } catch (e) {
    logger.error('Could not start app: %o', e);
    process.exit(1);
  }
};

startApp();
