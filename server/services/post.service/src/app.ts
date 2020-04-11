import 'reflect-metadata'; // We need this in order to use @Decorators
import express from 'express';
import logger from './util/logger';
import errorHandler from './util/error/ErrorHandler';
import {categoryRouter} from './api/route/category';
import {connectDb} from './db/mongo.connect';
import {config} from '../config/index';
import initDiContainer from './util/dependencyInjector';

initDiContainer();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.get('/ping', (req, res, next) => {
  res.send('pong');
});

app.use('/category', categoryRouter);
app.use(errorHandler);

app.listen(config.port, () => {
  logger.info(`post.service listening on port ${config.port}`);
});

connectDb();
