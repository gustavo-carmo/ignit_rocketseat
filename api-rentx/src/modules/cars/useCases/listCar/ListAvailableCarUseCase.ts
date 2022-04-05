import { inject, injectable } from 'tsyringe';

import IListCarDTO from '@modules/cars/dtos/IListCarDTO';
import Car from '@modules/cars/infra/typeorm/entities/Car';
import ICarsRepository from '@modules/cars/repositories/ICarsRepository';

@injectable()
export default class ListAvailableCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({ brand, category_id, model }: IListCarDTO): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable({
      brand,
      category_id,
      model,
    });

    return cars;
  }
}
