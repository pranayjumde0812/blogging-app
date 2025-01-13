import {Request, Response, NextFunction} from 'express';
import {UnAuthorizedException} from '../utils/exceptions';
import jwt, {TokenExpiredError} from 'jsonwebtoken';
import {env} from '../config/config';
import {TokenPayload} from '../constants/jwtPayload';
import {AuthRequest} from '../constants/customRequest';

const auth = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const token = extractTokenFromHeader(req);

    if (!token) {
      throw new UnAuthorizedException('No token provided');
    }

    const decodedToken = jwt.verify(token, env.JWT_SECRET) as TokenPayload;
    (req as AuthRequest).user = decodedToken.user?.id;
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      next(new UnAuthorizedException('Token expired'));
    } else {
      next(new UnAuthorizedException('Invalid token'));
    }
  }
};

function extractTokenFromHeader(req: Request): string | null {
  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith('Bearer')) {
    return authHeader.substring(7);
  }
  return null;
}

export default auth;
