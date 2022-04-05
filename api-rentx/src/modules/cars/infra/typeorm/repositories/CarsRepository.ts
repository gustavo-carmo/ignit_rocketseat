import { getRepository, Repository, ILike } from 'typeorm';

import ICreateCarDTO from '@modules/cars/dtos/ICreateCarDTO';
import IListCarDTO from '@modules/cars/dtos/IListCarDTO';
import ICarsRepository from '@modules/cars/repositories/ICarsRepository';

import Car from '../entities/Car';

export default class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({
        available,
      })
      .where('id = :id')
      .setParameters({
        id,
      })
      .execute();
  }

  async findById(id: string): Promise<Car | undefined> {
    const car = await this.repository.findOne(id);

    return car;
  }

  async findAvailable({
    brand,
    category_id,
    model,
  }: IListCarDTO): Promise<Car[]> {
    const where = {
      available: true,
    };

    if (brand) {
      Object.assign(where, {
        brand: ILike(`%${brand}%`),
      });
    }

    if (category_id) {
      Object.assign(where, {
        category_id: ILike(`%${category_id}%`),
      });
    }

    if (model) {
      Object.assign(where, {
        model: ILike(`%${model}%`),
      });
    }

    const cars = await this.repository.find({
      where,
      order: {
        model: 'ASC',
      },
    });

    return cars;
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    model,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      model,
      specifications,
      id,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    const car = await this.repository.findOne({
      where: {
        license_plate,
      },
    });

    return car;
  }
}
