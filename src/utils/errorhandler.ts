import {NextFunction, Request, Response} from 'express';
import HttpException from './exceptions/http.exceptions';
import {env} from '../config/config';
import errorLog from './errorLog';
import {HttpStatus} from '../constants/httpStatus';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof HttpException) {
    res.status(err.statusCode).json({
      message: err.message,
      ...(env.NODE_ENV !== 'production' && {stack: err.stack}),
    });
  } else {
    errorLog(err);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Unexpected error',
      ...(env.NODE_ENV !== 'production' && {stack: err.stack}),
    });
  }
};
