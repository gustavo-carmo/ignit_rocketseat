import { Router, Request, Response } from 'express';

import SpecificationsRepository from '../modules/cars/repositories/implementations/SpecificationsRepository';
import CreateSpecificationService from '../modules/cars/services/CreateSpacificationService';

const specificationRoutes = Router();

const specificationsRepository = new SpecificationsRepository();

specificationRoutes.get('/', (request: Request, response: Response) => {
  const specifications = specificationsRepository.list();

  return response.status(200).json(specifications);
});

specificationRoutes.post('/', (request: Request, response: Response) => {
  const { name, description } = request.body;

  const createSpecificationService = new CreateSpecificationService(
    specificationsRepository,
  );

  const specification = createSpecificationService.execute({
    name,
    description,
  });

  return response.status(201).json(specification);
});

export default specificationRoutes;
