import { inject, injectable } from 'tsyringe';

import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';
import IDateProvider from '@shared/container/providers/DateProvider/IDateProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
export default class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ id, user_id }: IRequest): Promise<void> {
    const rental = await this.rentalsRepository.findById(id);
    const minimal_daily = 1;

    if (!rental) {
      throw new AppError('Rental not found!');
    }

    if (rental.end_date) {
      throw new AppError('Rental already finished!');
    }

    const car = await this.carsRepository.findById(rental.car_id);

    if (!car) {
      throw new AppError('Car does not exists!');
    }

    /* if (rental.user_id !== user_id) {
      throw new AppError(`The Rental does not belong to user [${user_id}]`);
    } */

    const dateNow = this.dateProvider.dateNow();

    let daily = this.dateProvider.compareInDays(rental.start_date, dateNow);

    if (daily <= 0) {
      daily = minimal_daily;
    }

    const delay = this.dateProvider.compareInDays(
      dateNow,
      rental.expected_return_date,
    );

    let total = 0;

    if (delay > 0) {
      total = delay * car.fine_amount;
    }

    // TODO delay is wrong I need correct
    console.log('Daily -> ', daily);
    console.log('Delay -> ', delay);
    // throw new AppError('bla');

    total += daily * car.daily_rate;

    rental.total = total;
    rental.end_date = this.dateProvider.dateNow();

    await this.rentalsRepository.createOrUpdate(rental);

    await this.carsRepository.updateAvailable(rental.car_id, true);
  }
}
