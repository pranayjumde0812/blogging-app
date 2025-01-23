import {createTransport} from 'nodemailer';
import {env} from './config';

const transporter = createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  auth: {
    user: env.SMTP_USERNAME,
    pass: env.SMTP_PASSWORD,
  },
});

export default transporter;
