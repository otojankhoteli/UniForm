export const config = {
  env: process.env.NODE_ENV ?? 'development',
  port: process.env.PORT ?? 3003,
  mongo: {
    host: process.env.MONGO_HOST ?? 'localhost',
    port: process.env.MONGO_PORT ?? 27020,
    user: process.env.MONGO_USER ?? 'test',
    password: process.env.MONGO_PASSWORD ?? 'test',
    db: process.env.POST_DB ?? 'notification-service',
  },
  logs: {
    level: process.env.LOG_LEVEL ?? 'silly',
  },
  authentication: {
    secret: 'secret',
  },
  rabbitmq: {
    url: process.env.RABBITMQ_URL ?? 'localhost',
    port: process.env.RABBITMQ_PORT ?? 5672,
    user: process.env.RABBITMQ_USER ?? 'guest',
    pass: process.env.RABBITMQ_PASS ?? 'guest',
  },
  serviceName: 'notification.service',
};
