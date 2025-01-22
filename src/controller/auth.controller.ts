import {Request, Response, NextFunction} from 'express';
import catchAsync from '../utils/catchAsync';
import {HttpStatus} from '../constants/httpStatus';
import {authService, tokenService} from '../services';
import logger from '../utils/logger';
import {responseMaker} from '../utils/responseMaker';

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logger.info('Start of auth controller login method');

    const author = await authService.login(req.body);
    logger.info(author.toJSON, 'Author Details');

    const tokens = await tokenService.generateAuthToken(author);

    logger.info('End of auth controller login method');

    res.status(HttpStatus.OK).send(responseMaker({author, tokens}));
  },
);
