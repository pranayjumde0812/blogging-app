import express from 'express';
import cors from 'cors';
import {env} from './config/config';
import {databaseConnection} from './config/dbconfig';
import logger from './utils/logger';

const app = express();

databaseConnection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(env.PORT, () => {
  logger.info(`App is running on ${env.PORT}`);
});
