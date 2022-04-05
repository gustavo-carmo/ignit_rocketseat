import { Router } from 'express';

import CreateRentalController from '@modules/rentals/useCases/CreateRental/CreateRentalController';
import DevolutionRentalController from '@modules/rentals/useCases/DevolveRental/DevolutionRentalController';
import ListRentalsByUserController from '@modules/rentals/useCases/ListRentalsByUser/ListRentalsByUserController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserUseCase = new ListRentalsByUserController();

const rentalsRouter = Router();

rentalsRouter.use(ensureAuthenticated);

rentalsRouter.post('/', createRentalController.handle);
rentalsRouter.post('/:id/devolutions', devolutionRentalController.handle);
rentalsRouter.get('/user', listRentalsByUserUseCase.handle);

export default rentalsRouter;
