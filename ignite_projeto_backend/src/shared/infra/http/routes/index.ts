import { Router } from 'express';

import authenticateRoutes from './authenticate.routes';
import carsRouter from './cars.routes';
import categoriesRoutes from './categories.routes';
import specificationsRoutes from './specifications.routes';
import usersRoutes from './users.routes';

const routes = Router();

routes.use('/categories', categoriesRoutes);
routes.use('/specifications', specificationsRoutes);
routes.use('/users', usersRoutes);
routes.use('/session', authenticateRoutes);
routes.use('/cars', carsRouter);

export default routes;
