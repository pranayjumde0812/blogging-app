import mongoose from 'mongoose';
import {env} from './config';
import logger from '../utils/logger';

const MONGODB_URL = env.MONGODB_URL;

export const databaseConnection = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    logger.info('Database connected successfully');
  } catch (err) {
    logger.error('Database connection failed ', err);
    process.exit(0);
  }
};
