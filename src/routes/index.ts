import {Router} from 'express';
import authRouter from './auth.routes';
import authorRouter from './author.routes';

const router = Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/author',
    route: authorRouter,
  },
];

defaultRoutes.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
