import express from 'express';
import logger from './util/logger';
import errorHandler from './util/ErrorHandler';
import {config} from './config';
const app = express();

app.get('/ping', (req, res, next) => {
  res.send('pong');
});

app.use(errorHandler);

app.listen(config.port, () => {
  logger.info(`user.service listening on port ${config.port}`);
});
