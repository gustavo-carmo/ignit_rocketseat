import { inject, injectable } from 'tsyringe';

import Car from '@modules/cars/infra/typeorm/entities/Car';
import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import ICategoriesRepository from '@modules/cars/repositories/ICategoriesRepository';
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
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
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

    const categoryExists = await this.categoriesRepository.findById(
      category_id,
    );

    if (!categoryExists) {
      throw new AppError('Category does not exists!');
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
