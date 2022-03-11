import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import CreateCarController from '@modules/cars/useCases/createCar/CreateCarController';
import CreateSpecificationCarController from '@modules/cars/useCases/createSpecificationCar/CreateSpecificationCarController';
import ListAvailableCarController from '@modules/cars/useCases/listCar/ListAvailableCarController';
import UploadCarImagesController from '@modules/cars/useCases/uploadCarImage/UploadCarImagesController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ensureIsAdmin from '../middlewares/ensureIsAdmin';

const carsRouter = Router();
const createCarsController = new CreateCarController();
const listAvailableCarController = new ListAvailableCarController();
const createSpecificationCarController = new CreateSpecificationCarController();
const uploadCarImagesController = new UploadCarImagesController();
const uploadCarImages = multer(uploadConfig.upload('./tmp/car'));

carsRouter.get('/available', listAvailableCarController.handle);

carsRouter.use(ensureAuthenticated, ensureIsAdmin);

carsRouter.post(
  '/:id/images',
  uploadCarImages.array('images'),
  uploadCarImagesController.handle,
);
carsRouter.post('/:id/specifications', createSpecificationCarController.handle);
carsRouter.post('/', createCarsController.handle);

export default carsRouter;
