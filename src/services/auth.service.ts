import {authorService} from '.';
import {LoginInterface} from '../schema/auth.schema';
import {BadRequestException} from '../utils/exceptions';
import logger from '../utils/logger';

export const login = async (loginBody: LoginInterface): Promise<any> => {
  logger.info('Start of auth service login method');
  const author = await authorService.getAuthorByEmail(loginBody.email);

  if (!author || !(await author.isPasswordMatch(loginBody.password))) {
    throw new BadRequestException('Invalid credentials');
  }

  return author;
};
