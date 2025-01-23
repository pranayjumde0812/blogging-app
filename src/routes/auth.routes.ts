import {Router} from 'express';
import {authController} from '../controller';
import {validateBody} from '../middleware/validate.middleware';
import {
  ForgotPasswordSchema,
  LoginSchema,
  RefreshTokenSchema,
} from '../schema/auth.schema';
import auth from '../middleware/authenticate.middleware';

const routes = Router();

routes.post('/login', validateBody(LoginSchema), authController.login);

routes.post('/logout', auth, authController.logout);

routes.post(
  '/refresh-token',
  validateBody(RefreshTokenSchema),
  authController.refreshToken,
);

routes.post(
  '/forgot-password',
  validateBody(ForgotPasswordSchema),
  authController.forgotPassword,
);

export default routes;
