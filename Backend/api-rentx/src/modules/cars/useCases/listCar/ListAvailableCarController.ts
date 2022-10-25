import { Request, Response } from 'express';
import { container } from 'tsyringe';

import IListCarDTO from '@modules/cars/dtos/IListCarDTO';

import ListAvailableCarUseCase from './ListAvailableCarUseCase';

export default class ListAvailableCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { brand, category_id, model }: IListCarDTO = request.query;

    const listAvailableCarUseCase = container.resolve(ListAvailableCarUseCase);

    const cars = await listAvailableCarUseCase.execute({
      brand,
      category_id,
      model,
    });

    return response.status(200).json(cars);
  }
}
