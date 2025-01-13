import {Request, Response, NextFunction} from 'express';
import catchAsync from '../utils/catchAsync';
import {HttpStatus} from '../constants/httpStatus';

export const getUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const message = 'This is my first API';
    res.status(HttpStatus.OK).json({message});
  },
);
