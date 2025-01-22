import {authorService} from '.';
import TOKEN_TYPES from '../constants/tokenTypes';
import {Token} from '../models/token.model';
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

export const logout = async (user: any): Promise<any> => {
  logger.info('Start of auth service logout method');

  const latestToken = await Token.findOne({
    user: user,
    type: TOKEN_TYPES.REFRESH,
  })
    .sort({createdAt: -1})
    .limit(1);

  if (!latestToken) {
    throw new BadRequestException('Token not found');
  }

  const response = await latestToken.deleteOne();
  logger.info('End of auth service logout method');

  return response;
};
