import {Router} from 'express';
import authRouter from './auth.routes';
const router = Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRouter,
  },
];

defaultRoutes.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
