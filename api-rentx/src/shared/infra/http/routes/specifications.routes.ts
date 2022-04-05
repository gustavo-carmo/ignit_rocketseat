import { Router } from 'express';

import CreateSpecificationController from '@modules/cars/useCases/createSpecification/CreateSpecificationController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ensureIsAdmin from '../middlewares/ensureIsAdmin';

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRoutes.use(ensureAuthenticated);
specificationRoutes.use(ensureIsAdmin);

specificationRoutes.post('/', createSpecificationController.handle);

export default specificationRoutes;
