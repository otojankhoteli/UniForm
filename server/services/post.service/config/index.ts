export const config = {
  env: process.env.NODE_ENV ?? 'development',
  port: process.env.PORT ?? 3001,
  mongo: {
    host: process.env.MONGO_HOST ?? 'localhost',
    port: process.env.MONGO_PORT ?? 27018,
    user: process.env.MONGO_USER ?? 'test',
    password: process.env.MONGO_PASSWORD ?? 'test',
    db: process.env.POST_DB ?? 'post-service',
  },
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },
};
