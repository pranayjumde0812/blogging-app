import {Author} from '../models/author.model';
import {
  SignupAuthorInterface,
  UpdateAuthorInterface,
} from '../schema/author.schema';
import {BadRequestException, NotFoundException} from '../utils/exceptions';
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

export const getAuthorByEmail = async (email: string): Promise<any> => {
  logger.info('Start of GetAuthorByEmail method of author service');
  logger.info(`Email: ${email}`);

  const author = await Author.findOne({email: email});

  logger.info('End of GetAuthorByEmail method of author service');

  return author;
};

export const getAuthorById = async (authorId: string): Promise<any> => {
  logger.info('Start of GetAuthorByEmail method of author service');
  logger.info(`AuthorId: ${authorId}`);

  const author = await Author.findById(authorId);
  if (!author) {
    throw new BadRequestException('Invalid authorId');
  }

  logger.info('End of GetAuthorByEmail method of author service');

  return author;
};

export const updateAuthorById = async (
  authorId: string,
  updateBody: UpdateAuthorInterface,
) => {
  const author = await getAuthorById(authorId);
  if (!author) {
    throw new NotFoundException('Author not found');
  }

  if (
    updateBody.email &&
    (await Author.isEmailTaken(updateBody.email, authorId))
  ) {
    throw new BadRequestException('Email Already Exits');
  }
  Object.assign(author, updateBody);
  await author.save();
  return author;
};
