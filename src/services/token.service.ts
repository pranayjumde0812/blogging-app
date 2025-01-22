import moment from 'moment';
import {User} from '../types/user';
import jwt from 'jsonwebtoken';
import {env} from '../config/config';
import TOKEN_TYPES from '../constants/tokenTypes';
import {TokenPayload} from '../constants/jwtPayload';
import {Token} from '../models/token.model';
import {UnAuthorizedException} from '../utils/exceptions';

export const generateAuthToken = async (user: User) => {
  const accessTokenExpires = moment().add(
    env.JWT_ACCESS_TOKEN_EXPIRATION_MINUTES,
    'minutes',
  );

  const accessToken = generateToken(
    user.id,
    accessTokenExpires,
    TOKEN_TYPES.ACCESS,
  );

  const refreshTokenExpires = moment().add(
    env.JWT_REFRESH_TOKEN_EXPIRATION_DAYS,
    'days',
  );

  const refreshToken = generateToken(
    user.id,
    refreshTokenExpires,
    TOKEN_TYPES.REFRESH,
  );

  await saveToken(
    refreshToken,
    user.id,
    refreshTokenExpires,
    TOKEN_TYPES.REFRESH,
  );

  return {
    accessToken: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refreshToken: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

function generateToken(
  userId: string,
  tokenExpires: moment.Moment,
  tokenType: string,
  secret: string = env.JWT_SECRET,
): string {
  const payload: TokenPayload = {
    user: {
      id: userId,
    },
    iat: moment().unix(),
    exp: tokenExpires.unix(),
    type: tokenType,
  };
  return jwt.sign(payload, secret);
}

async function saveToken(
  token: string,
  userId: string,
  expires: moment.Moment,
  type: string,
  blacklisted = false,
) {
  const savedToken = await Token.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
    blacklisted,
  });
  return savedToken;
}

export const verifyToken = async (
  token: string,
  type: string,
): Promise<any> => {
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as TokenPayload;
    const tokenDoc = await Token.findOne({
      token,
      type,
      user: payload.user.id,
      blacklisted: false,
    });

    if (!tokenDoc) {
      throw new UnAuthorizedException('Token not found');
    }

    return tokenDoc;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new UnAuthorizedException('Token expired');
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new UnAuthorizedException('Invalid token');
    } else {
      throw error;
    }
  }
};
