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
  authentication: {
    secret: 'secret',
    refreshSecret: 'refreshSecret',
    refreshTokenLength: 20,
    refreshTokenValid: 30, //days
    tokenValid: 2 //minutes
  }
};

// TODO change config from buildable file to cfg file
