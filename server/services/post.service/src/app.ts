import express from 'express';
import logger from './util/logger';
import errorHandler from './util/ErrorHandler';

const app = express();
const port = process.env.PORT ?? 3001;

app.get('/ping', (req, res, next) => {
  res.send('pong');
});

app.use(errorHandler);

app.listen(port, () => {
  logger.info(`post.service listening on port ${port}`);
});
