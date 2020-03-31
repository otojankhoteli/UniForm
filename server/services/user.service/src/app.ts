import express from 'express';
import logger from './util/logger';
import errorHandler from './util/ErrorHandler';

const app = express();
const port = process.env.PORT ?? 80;

app.get('/ping', (req, res, next) => {
  res.send('pong');
});

app.use(errorHandler);

app.listen(port, () => {
  logger.info(`user.service listening on port ${port}`);
});
