import {authorService, tokenService} from '.';
import TOKEN_TYPES from '../constants/tokenTypes';
import {Token} from '../models/token.model';
import {LoginInterface, ResfreshTokenInterface} from '../schema/auth.schema';
import {User} from '../types/user';
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

export const logout = async (user: string): Promise<any> => {
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

export const refreshToken = async (refreshToken: string): Promise<any> => {
  logger.info('Start of auth service refresh token method');

  const tokenDoc = await tokenService.verifyToken(
    refreshToken,
    TOKEN_TYPES.REFRESH,
  );

  // const author = await authorService.getAuthorById(tokenDoc.user);
  return tokenService.generateAuthTokenFromRefresh(tokenDoc.user);
};
