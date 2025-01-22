import {Router} from 'express';
import {authController} from '../controller';
import {validateBody} from '../middleware/validate.middleware';
import {LoginSchema} from '../schema/auth.schema';

const routes = Router();

routes.post('/login', validateBody(LoginSchema), authController.login);

export default routes;
