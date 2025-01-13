import {z} from 'zod';
import {Request, Response, NextFunction} from 'express';
import {
  BadRequestException,
  InternalServerException,
} from '../utils/exceptions';

export const validateBody =
  <T>(schema: z.Schema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req.body);
      req.body = parsed;
      next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors = err.issues[0];
        const error = `${errors.path[0]}: ${errors.message}`;
        throw new BadRequestException(error);
      } else {
        throw new InternalServerException();
      }
    }
  };

export const validateParams =
  <T>(schema: z.Schema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req.params);
      req.params = parsed;
      next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors = err.issues[0];
        const error = `${errors.path[0]}: ${errors.message}`;
        throw new BadRequestException(error);
      } else {
        throw new InternalServerException();
      }
    }
  };

export const validateQuery =
  <T>(schema: z.Schema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req.query);
      req.query = parsed;
      next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors = err.issues[0];
        const error = `${errors.path[0]}: ${errors.message}`;
        throw new BadRequestException(error);
      } else {
        throw new InternalServerException();
      }
    }
  };
