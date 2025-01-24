import path from 'path';
import {env} from '../config/config';
import transporter from '../config/email.config';
import fs from 'fs';

export const sendRestPasswordEmail = async (
  fullName: string,
  email: string,
  token: string,
) => {
  const subject = 'Reset Password - Blogging Application';
  const resetPasswordLink = `${env.FE_URL}/reset-password?token=${token}`;

  const templatePath = path.join(
    __dirname,
    '../assets/template/reset-password.html',
  );

  const template = fs.readFileSync(templatePath, 'utf8');

  const emailHtmlContent = template
    .replace('{{fullName}}', fullName)
    .replace('{{resetPasswordLink}}', resetPasswordLink);

  await sendEmail(email, subject, emailHtmlContent);
};

export const sendEmail = async (
  to: string,
  subject: string,
  content: string,
) => {
  const message = {
    from: env.EMAIL_FROM,
    to,
    subject,
    html: content,
    attachments: [
      {
        filename: 'company_logo.png',
        path: path.join(__dirname, '../assets/images/company-logo.jpeg'),
        cid: 'company-logo',
      },
    ],
  };
  await transporter.sendMail(message);
};
