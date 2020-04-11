import mongoose from 'mongoose';
import {config} from '../../config';
import logger from '../util/logger';

const {host, port, db, user, password} = config.mongo;
const mongoURI = `mongodb://${user}:${password}@${host}:${port}/${db}?authSource=admin`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 5,
  bufferMaxEntries: 0,
};

export const connectDb = async () => {
  await mongoose.connect(mongoURI, options)
      .then(() => {
        logger.info('connected to mongo');
      })
      .catch((error) => {
        console.error('Unable to connect to the mongodb instance.Error: ', error);
        process.exit(1);
      });
};

