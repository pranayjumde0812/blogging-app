import {Author} from '../models/author.model';
import {SignupAuthorInterface} from '../schema/author.schema';
import {BadRequestException} from '../utils/exceptions';
import logger from '../utils/logger';

export const signupAuthor = async (
  signupAuthorBody: SignupAuthorInterface,
): Promise<any> => {
  logger.info('Start of signupAuthor service method');

  const existingAuthor = await Author.isEmailTaken(signupAuthorBody.email);
  logger.info(`Existing Author: ${existingAuthor}`);
  if (existingAuthor) {
    throw new BadRequestException('Email already registered');
  }

  const createdAuthor = await Author.create(signupAuthorBody);
  logger.info(createdAuthor.toJSON, 'Created Author');

  if (!createdAuthor) {
    throw new BadRequestException('Author creation failed');
  }
  logger.info('End of signupAuthor service method');
  return createdAuthor;
};
