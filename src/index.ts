import express from 'express';
import cors from 'cors';
import {env} from './config/config';
import {databaseConnection} from './config/dbconfig';
import logger from './utils/logger';
import {errorHandler} from './utils/errorhandler';

const app = express();

databaseConnection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Error handling middleware
app.use(errorHandler);

app.listen(env.PORT, () => {
  logger.info(`App is running on ${env.PORT}`);
});
