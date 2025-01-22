import {Router} from 'express';
import {authController} from '../controller';
import {validateBody} from '../middleware/validate.middleware';
import {LoginSchema} from '../schema/auth.schema';
import auth from '../middleware/authenticate.middleware';

const routes = Router();

routes.post('/login', validateBody(LoginSchema), authController.login);

routes.post('/logout', auth, authController.logout);

export default routes;
