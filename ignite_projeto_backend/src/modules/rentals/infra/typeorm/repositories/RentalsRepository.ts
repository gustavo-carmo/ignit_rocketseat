import { getRepository, Repository } from 'typeorm';

import ICreateRentalDTO from '@modules/rentals/dtos/ICreateRentalDTO';
import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';

import Rental from '../entities/Rental';

export default class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    const rentals = await this.repository.find({
      where: {
        user_id,
      },
      relations: ['car'],
      order: {
        created_at: 'DESC',
      },
    });

    return rentals;
  }

  async findById(id: string): Promise<Rental | undefined> {
    const rental = await this.repository.findOne(id);

    return rental;
  }

  async createOrUpdate({
    car_id,
    expected_return_date,
    user_id,
    end_date,
    total,
    id,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      expected_return_date,
      user_id,
      end_date,
      total,
      id,
    });

    await this.repository.save(rental);

    return rental;
  }

  async findOpenedRentalByCar(car_id: string): Promise<Rental | undefined> {
    const rental = await this.repository.findOne({
      where: {
        car_id,
        end_date: null,
      },
    });

    return rental;
  }

  async findOpenedRentalByUse(user_id: string): Promise<Rental | undefined> {
    const rental = await this.repository.findOne({
      where: {
        user_id,
        end_date: null,
      },
    });

    return rental;
  }
}
