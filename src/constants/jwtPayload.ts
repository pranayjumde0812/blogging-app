import jwt from 'jsonwebtoken';

export interface TokenPayload extends jwt.JwtPayload {
  user: {
    id: string;
  };
}
