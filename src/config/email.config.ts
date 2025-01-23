import {createTransport} from 'nodemailer';

export const transporter = createTransport({
  host: '',
  port: 587,
  auth: {
    user: '',
    pass: '',
  },
});
