import express from 'express';
import logger from './util/logger';
import errorHandler from './util/ErrorHandler';
import {categoryRouter} from './api/route/category';

const app = express();
const port = process.env.PORT ?? 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.get('/ping', (req, res, next) => {
  res.send('pong');
});

app.use('/category', categoryRouter);
app.use(errorHandler);

app.listen(port, () => {
  logger.info(`post.service listening on port ${port}`);
});
