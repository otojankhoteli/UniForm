export const config = {
  env: process.env.NODE_ENV ?? 'development',
  port: process.env.PORT ?? 3000,
  mongo: {
    host: process.env.MONGO_HOST ?? 'localhost',
    port: process.env.MONGO_PORT ?? 27017,
    user: process.env.MONGO_USER ?? 'test',
    password: process.env.MONGO_PASSWORD ?? 'test',
    db: process.env.USER_DB ?? 'user-mongodb',
  },
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },
  authentication: {
    secret: 'secret',
    refreshSecret: 'refreshSecret',
    refreshTokenLength: 20,
    refreshTokenValid: 30, // days
    tokenValid: 2 * 60000, // minutes. 60 0000 becaue of milliseconds
  },
  rabbitmq: {
    url: process.env.RABBITMQ_URL ?? 'localhost',
    port: process.env.RABBITMQ_PORT ?? 5672,
    user: process.env.RABBITMQ_USER ?? 'guest',
    pass: process.env.RABBITMQ_PASS ?? 'guest',
  },
};