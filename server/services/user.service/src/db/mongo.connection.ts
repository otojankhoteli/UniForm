import mongoose from 'mongoose';
import {config} from '../config';
import logger from '../util/logger';

const {host, port, db, user, password} = config.mongo;

const mongoURI = `mongodb://${host}:${port}/${db}`;

console.log(mongoURI);
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  poolSize: 5,
  bufferMaxEntries: 0,
};


export default async () => {
  await mongoose.connect(mongoURI, options)
      .then(() => logger.info('connected to mongo'))
      .catch((error) => {
        console.error('Unable to connect to the mongodb instance.Error: ', error);
        process.exit(1);
      });
};

// TODO refactor
