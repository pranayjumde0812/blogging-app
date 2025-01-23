import {createTransport} from 'nodemailer';
import {env} from './config';
import logger from '../utils/logger';
import { InternalServerException } from '../utils/exceptions';

const transporter = createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  auth: {
    user: env.SMTP_USERNAME,
    pass: env.SMTP_PASSWORD,
  },
});

try {
  transporter.verify();
  logger.info('Connected Successfully to the SMTP Server');
} catch (error) {
  if (error) {
    logger.error('Error Connecting to the SMTP Server');
    logger.error(error);
  }
  throw new InternalServerException('Error Connecting to the SMTP Server');
}

export default transporter;
