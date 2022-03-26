import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/accounts/repositories/IUsersRepository';
import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import ICreateRentalDTO from '@modules/rentals/dtos/ICreateRentalDTO';
import Rental from '@modules/rentals/infra/typeorm/entities/Rental';
import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';
import IDateProvider from '@shared/container/providers/DateProvider/IDateProvider';
import AppError from '@shared/errors/AppError';

dayjs.extend(utc);

@injectable()
export default class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const minimumHoursToRent = 24;

    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) {
      throw new AppError(`Car does not exists!`);
    }

    await this.usersRepository.findById(user_id);

    const carAlreadyRented = await this.rentalsRepository.findOpenedRentalByCar(
      car_id,
    );

    if (carAlreadyRented) {
      throw new AppError(`Car already rented!`);
    }

    const userAlreadyRentedACar =
      await this.rentalsRepository.findOpenedRentalByUse(user_id);

    if (userAlreadyRentedACar) {
      throw new AppError(`User already rented a car!`);
    }

    const compareDates = this.dateProvider.compareInHours(
      this.dateProvider.dateNow(),
      expected_return_date,
    );

    if (compareDates < minimumHoursToRent) {
      throw new AppError('Return time should be at least 24 hours!');
    }

    await this.carsRepository.updateAvailable(car_id, false);

    const rental = await this.rentalsRepository.createOrUpdate({
      car_id,
      user_id,
      expected_return_date,
    });

    return rental;
  }
}
