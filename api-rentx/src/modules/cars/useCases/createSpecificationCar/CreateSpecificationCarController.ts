import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSpecificationCarUseCase from './CreateSpecificationCarUseCase';

export default class CreateSpecificationCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: car_id } = request.params;
    const { specifications_id } = request.body;

    const createSpecificationCarUseCase = container.resolve(
      CreateSpecificationCarUseCase,
    );

    const car = await createSpecificationCarUseCase.execute({
      car_id,
      specifications_id,
    });

    return response.status(200).json(car);
  }
}
