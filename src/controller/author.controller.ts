import {Request, Response, NextFunction} from 'express';
import catchAsync from '../utils/catchAsync';
import {HttpStatus} from '../constants/httpStatus';
import {authorService} from '../services';
import logger from '../utils/logger';
import {responseMaker} from '../utils/responseMaker';

export const signupAuthor = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logger.info('Start of signupAuthor controller method');
    logger.info(req.body, 'Signup request body');

    const createdAuthor = await authorService.signupAuthor(req.body);

    logger.info('End of signupAuthor controller method');

    res.status(HttpStatus.CREATED).send(
      responseMaker({
        success: true,
        message: 'Author created successfully',
        createdAuthor,
      }),
    );
  },
);
