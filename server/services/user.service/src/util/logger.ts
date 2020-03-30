import winston = require('winston');


export default winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  levels: winston.config.npm.levels,
  format: winston.format.combine(winston.format.colorize(),
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      winston.format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`)),
  transports: [new winston.transports.Console()],
});
