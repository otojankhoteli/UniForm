export const config = {
  env: process.env.NODE_ENV ?? 'development',
  port: process.env.PORT ?? 3000,
  mongo: {
    host: process.env.MONGO_HOST ?? 'localhost',
    port: process.env.MONGO_PORT ?? 27017,
    user: process.env.MONGO_USER ?? 'test',
    password: process.env.MONGO_PASSWORD ?? 'test',
    db: process.env.POST_DB ?? 'user-mongodb',
  },
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },
};
