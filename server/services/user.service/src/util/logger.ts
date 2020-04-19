import winston = require('winston');
import {config} from '../config/index';

export default winston.createLogger({
  level: config.logs.level ?? 'silly',
  levels: winston.config.npm.levels,
  format: winston.format.combine(winston.format.colorize(),
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      winston.format.splat(),
      // winston.format.json(),
      winston.format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`)),
  transports: [new winston.transports.Console()],
});
