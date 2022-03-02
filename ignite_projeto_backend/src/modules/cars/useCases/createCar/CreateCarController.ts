import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCarUseCase from './CreateCarUseCase';

export default class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      model,
    } = request.body;

    const createCarUseCase = container.resolve(CreateCarUseCase);

    const car = await createCarUseCase.execute({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      model,
    });

    return response.status(201).json(car);
  }
}
