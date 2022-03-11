import ICreateCarDTO from '@modules/cars/dtos/ICreateCarDTO';
import IListCarDTO from '@modules/cars/dtos/IListCarDTO';
import Car from '@modules/cars/infra/typeorm/entities/Car';

import ICarsRepository from '../ICarsRepository';

export default class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    const car = this.cars.find((car) => car.license_plate === license_plate);

    return car;
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    model,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      model,
    });

    this.cars.push(car);

    return car;
  }

  async findAvailable({
    brand,
    category_id,
    model,
  }: IListCarDTO): Promise<Car[]> {
    const cars = this.cars.filter((car) => {
      if (
        car.available === true ||
        (brand && car.brand === brand) ||
        (category_id && car.category_id === category_id) ||
        (model && car.model === model)
      ) {
        return car;
      }

      return null;
    });

    return cars;
  }

  async findById(id: string): Promise<Car | undefined> {
    const car = this.cars.find((car) => car.id === id);

    return car;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const index = this.cars.findIndex((car) => car.id === id);
    this.cars[index].available = available;
  }
}
