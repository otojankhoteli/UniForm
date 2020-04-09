import mongoose from 'mongoose';
import { config } from '../config';
import logger from '../util/logger';

const { host, port, db, user, password } = config.mongo;

const mongoURI = `mongodb://${host}:${port}/${db}`;

console.log(mongoURI);
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 5, // Maintain up to 10 socket connections
  bufferMaxEntries: 0,
  // user: 'test',
  // password: 'test',
};


export default async () => {
  await mongoose.connect(mongoURI, options)
    .then(() => logger.info('connected to mongo'))
    .catch((error) => {
      console.error('Unable to connect to the mongodb instance.Error: ', error);
      process.exit(1);
    });
};

