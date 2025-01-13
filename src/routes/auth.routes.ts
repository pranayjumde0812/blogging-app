import {Router} from 'express';
import {authController} from '../controller';

const routes = Router();

routes.get('/', authController.getUsers);

export default routes;
