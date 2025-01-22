import {Router} from 'express';
import {validateBody} from '../middleware/validate.middleware';
import {SignupAuthorSchema} from '../schema/author.schema';
import {authorController} from '../controller';

const routes = Router();

routes.post(
  '/signup',
  validateBody(SignupAuthorSchema),
  authorController.signupAuthor,
);

export default routes;
