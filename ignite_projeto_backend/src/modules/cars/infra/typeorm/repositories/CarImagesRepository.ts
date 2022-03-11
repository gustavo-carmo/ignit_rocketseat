import { getRepository, Repository } from 'typeorm';

import ICreateCarImageDTO from '@modules/cars/dtos/ICreateCarImageDTO';
import ICarImagesRepository from '@modules/cars/repositories/ICarImagesRepository';

import CarImage from '../entities/CarImage';

export default class CarImagesRepository implements ICarImagesRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  async findAllByCar(car_id: string): Promise<CarImage[]> {
    const carImages = await this.repository.find({
      where: {
        car_id,
      },
    });

    return carImages;
  }

  async create({ car_id, image_name }: ICreateCarImageDTO): Promise<CarImage> {
    const carImage = this.repository.create({
      car_id,
      image_name,
    });

    await this.repository.save(carImage);

    return carImage;
  }

  async delete(id: string) {
    await this.repository.delete(id);
  }
}
