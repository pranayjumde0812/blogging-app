import {Request, Response, NextFunction} from 'express';
import catchAsync from '../utils/catchAsync';
import {HttpStatus} from '../constants/httpStatus';
import {authService, emailService, tokenService} from '../services';
import logger from '../utils/logger';
import {responseMaker} from '../utils/responseMaker';
import {AuthRequest} from '../constants/customRequest';

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

export const logout = catchAsync(
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    logger.info('Start of auth controller logout method');

    const {user} = req;

    logger.info(user);

    await authService.logout(user);
    logger.info('Logged Out successfully');

    logger.info('End of auth controller logout method');

    res
      .status(HttpStatus.OK)
      .send(responseMaker({message: 'Successfully logged out'}));
  },
);

export const refreshToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    logger.info('Start of auth controller refresh token method');

    const token = await authService.refreshToken(req.body.refreshToken);

    logger.info('End of auth controller refresh token method');

    res
      .status(HttpStatus.OK)
      .send(responseMaker({message: 'Access token created', ...token}));
  },
);

export const forgotPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {email} = req.body;
    const {resetPasswordToken, author} =
      await tokenService.generateResetPasswordToken(email);

    await emailService.sendRestPasswordEmail(
      `${author.firstName} ${author.lastName}`,
      email,
      resetPasswordToken,
    );

    res
      .status(HttpStatus.OK)
      .send(
        responseMaker({
          message: 'Reset password link sent to your registered email',
        }),
      );
  },
);
