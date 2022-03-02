import { Router } from 'express';

import CreateCarController from '@modules/cars/useCases/createCar/CreateCarController';

const carsRouter = Router();
const createCarsController = new CreateCarController();

carsRouter.post('/', createCarsController.handle);

export default carsRouter;
