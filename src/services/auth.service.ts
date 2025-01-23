import {authorService, tokenService} from '.';
import TOKEN_TYPES from '../constants/tokenTypes';
import {Token} from '../models/token.model';
import {LoginInterface, ResetPasswordInterface} from '../schema/auth.schema';
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

  return tokenService.generateAuthTokenFromRefresh(tokenDoc.user);
};

export const resetPassword = async (
  resetPasswordBody: ResetPasswordInterface,
) => {
  const {token, password} = resetPasswordBody;

  const resetPasswordTokenDoc = await tokenService.verifyToken(
    token,
    TOKEN_TYPES.RESET_PASSWORD,
  );

  const author = await authorService.getAuthorById(resetPasswordTokenDoc.user);
  if (!author) {
    throw new BadRequestException('Invalid link/Expired link');
  }

  await authorService.updateAuthorById(author.id, {password: password});
  await Token.deleteMany({user: author.id, type: TOKEN_TYPES.RESET_PASSWORD});
};
