import logger from '../logger';

export default (err, req, res, next) => {
  const status = err.status || 500;
  logger.error(err.message);
  res.status(status).json({
    error: err.name,
    message: err.message,
    timestamp: new Date().getTime(),
    path: req.originalUrl,
  });
};
