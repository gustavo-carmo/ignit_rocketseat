import { Router } from 'express';

import authenticateRoutes from './authenticate.routes';
import carsRouter from './cars.routes';
import categoriesRoutes from './categories.routes';
import passwordRoute from './password.routes';
import rentalsRouter from './rentals.routes';
import specificationsRoutes from './specifications.routes';
import usersRoutes from './users.routes';

const routes = Router();

routes.use('/categories', categoriesRoutes);
routes.use('/specifications', specificationsRoutes);
routes.use('/users', usersRoutes);
routes.use('/session', authenticateRoutes);
routes.use('/cars', carsRouter);
routes.use('/rentals', rentalsRouter);
routes.use('/password', passwordRoute);

export default routes;
