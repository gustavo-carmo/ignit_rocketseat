import { inject, injectable } from 'tsyringe';

import Car from '@modules/cars/infra/typeorm/entities/Car';
import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import AppError from '@shared/errors/AppError';

interface IRequestDTO {
  model: string;
  brand: string;
  description: string;
  license_plate: string;
  daily_rate: number;
  fine_amount: number;
  category_id: string;
}

@injectable()
export default class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({
    model,
    brand,
    description,
    license_plate,
    daily_rate,
    fine_amount,
    category_id,
  }: IRequestDTO): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(
      license_plate,
    );

    if (carAlreadyExists) {
      throw new AppError(`Already exist a car with plate [${license_plate}]`);
    }

    const car = await this.carsRepository.create({
      model,
      brand,
      description,
      license_plate,
      daily_rate,
      fine_amount,
      category_id,
    });

    return car;
  }
}
