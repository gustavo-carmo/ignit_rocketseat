import dayjs from 'dayjs';

import User from '@modules/accounts/infra/typeorm/entities/User';
import UsersRepositoryInMemory from '@modules/accounts/repositories/inMemory/UsersRepositoryInMemory';
import Car from '@modules/cars/infra/typeorm/entities/Car';
import Category from '@modules/cars/infra/typeorm/entities/Category';
import CarsRepositoryInMemory from '@modules/cars/repositories/inMemory/CarsRepositoryInMemory';
import CategoriesRepositoryInMemory from '@modules/cars/repositories/inMemory/CategoriesRepositoryInMemory';
import ICreateRentalDTO from '@modules/rentals/dtos/ICreateRentalDTO';
import RentalsRepositoryInMemory from '@modules/rentals/repositories/inMemory/RentalsRepositoryInMemory';
import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';
import IDateProvider from '@shared/container/providers/DateProvider/IDateProvider';
import DayjsDateProvider from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import AppError from '@shared/errors/AppError';

import CreateRentalUseCase from './CreateRentalUseCase';

describe('Create rental', () => {
  let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

  let carsRepositoryInMemory: CarsRepositoryInMemory;
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let rentalsRepositoryInMemory: IRentalsRepository;
  let dateProvider: IDateProvider;

  let createRentalUseCase: CreateRentalUseCase;

  let car: Car;
  let user: User;
  let category: Category;
  let dayAdd24Hours: Date;

  beforeEach(async () => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();

    dayAdd24Hours = dayjs().add(1, 'day').toDate();

    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      carsRepositoryInMemory,
      usersRepositoryInMemory,
      dateProvider,
    );

    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    category = await categoriesRepositoryInMemory.create({
      description: 'Category',
      name: 'Castegory',
    });

    car = await carsRepositoryInMemory.create({
      brand: 'Brand',
      category_id: category.id,
      daily_rate: 100,
      fine_amount: 50,
      description: 'Description',
      license_plate: 'A83-384I',
      model: 'Model',
    });

    user = await usersRepositoryInMemory.create({
      name: 'User',
      email: 'user@email.com',
      password: '123456',
      driver_license: '3DL934',
    });
  });

  it('should be able to create a new rental', async () => {
    const rentalToCreate: ICreateRentalDTO = {
      car_id: car.id,
      user_id: user.id,
      expected_return_date: dayAdd24Hours,
    };

    const rental = await createRentalUseCase.execute({
      car_id: rentalToCreate.car_id,
      user_id: rentalToCreate.user_id,
      expected_return_date: rentalToCreate.expected_return_date,
    });

    expect(rental).toHaveProperty('id');
    expect(rental.car_id).toBe(rentalToCreate.car_id);
    expect(rental.user_id).toBe(rentalToCreate.user_id);
  });

  it('should not be able to create a new rental to a car that does note exists', async () => {
    const rentalToCreate: ICreateRentalDTO = {
      car_id: car.id,
      user_id: user.id,
      expected_return_date: dayAdd24Hours,
    };

    await expect(
      createRentalUseCase.execute({
        car_id: 'car-does-not-exists',
        user_id: rentalToCreate.user_id,
        expected_return_date: rentalToCreate.expected_return_date,
      }),
    ).rejects.toEqual(new AppError(`Car does not exists!`));
  });

  it('should not be able to create a new rental to a user that does note exists', async () => {
    const rentalToCreate: ICreateRentalDTO = {
      car_id: car.id,
      user_id: user.id,
      expected_return_date: dayAdd24Hours,
    };

    await expect(
      createRentalUseCase.execute({
        car_id: rentalToCreate.car_id,
        user_id: 'user-does-not-exists',
        expected_return_date: rentalToCreate.expected_return_date,
      }),
    ).rejects.toEqual(new AppError(`User did'nt found`));
  });

  it('should not be able to create a new rental to a car that already has a rental', async () => {
    const rentalToCreate: ICreateRentalDTO = {
      car_id: car.id,
      user_id: user.id,
      expected_return_date: dayAdd24Hours,
    };

    await createRentalUseCase.execute({
      car_id: rentalToCreate.car_id,
      user_id: rentalToCreate.user_id,
      expected_return_date: rentalToCreate.expected_return_date,
    });

    const newUser = await usersRepositoryInMemory.create({
      name: 'New User',
      email: 'new-user@email.com',
      password: '123456',
      driver_license: '3DL93N',
    });

    await expect(
      createRentalUseCase.execute({
        car_id: rentalToCreate.car_id,
        user_id: newUser.id,
        expected_return_date: rentalToCreate.expected_return_date,
      }),
    ).rejects.toEqual(new AppError('Car already rented!'));
  });

  it('should not be able to create a new rental to a user that already has a rental', async () => {
    const rentalToCreate: ICreateRentalDTO = {
      car_id: car.id,
      user_id: user.id,
      expected_return_date: dayAdd24Hours,
    };

    await createRentalUseCase.execute({
      car_id: rentalToCreate.car_id,
      user_id: rentalToCreate.user_id,
      expected_return_date: rentalToCreate.expected_return_date,
    });

    const newCar = await carsRepositoryInMemory.create({
      brand: 'Brand 2',
      category_id: category.id,
      daily_rate: 100,
      fine_amount: 50,
      description: 'Description of second car',
      license_plate: 'A45-387I',
      model: 'Model 2',
    });

    await expect(
      createRentalUseCase.execute({
        car_id: newCar.id,
        user_id: rentalToCreate.user_id,
        expected_return_date: rentalToCreate.expected_return_date,
      }),
    ).rejects.toEqual(new AppError('User already rented a car!'));
  });

  it('should not be able to create a new rental with less then 24 hours', async () => {
    const rentalToCreate: ICreateRentalDTO = {
      car_id: car.id,
      user_id: user.id,
      expected_return_date: new Date(),
    };

    await expect(
      createRentalUseCase.execute({
        car_id: rentalToCreate.car_id,
        user_id: rentalToCreate.user_id,
        expected_return_date: rentalToCreate.expected_return_date,
      }),
    ).rejects.toEqual(new AppError('Return time should be at least 24 hours!'));
  });
});
