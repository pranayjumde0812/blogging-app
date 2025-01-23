import {env} from '../config/config';
import transporter from '../config/email.config';

export const sendRestPasswordEmail = async (
  fullName: string,
  email: string,
  token: string,
) => {
  const subject = 'Reset Password - Blogging Application';
  const resetPasswordLink = `${env.FE_URL}/reset-password?token=${token}`;

  const content = `Dear ${fullName}, 
  
  Reset Password with the given link: ${resetPasswordLink}
  Ignore if not request by you.

  Regards,
  Admin  
  `;

  await sendEmail(email, subject, content);
};

export const sendEmail = async (
  to: string,
  subject: string,
  content: string,
) => {
  const message = {from: env.EMAIL_FROM, to, subject, text: content};
  await transporter.sendMail(message);
};
