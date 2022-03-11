import Category from '@modules/cars/infra/typeorm/entities/Category';
import CarsRepositoryInMemory from '@modules/cars/repositories/inMemory/CarsRepositoryInMemory';
import CategoriesRepositoryInMemory from '@modules/cars/repositories/inMemory/CategoriesRepositoryInMemory';

import CreateCarUseCase from '../createCar/CreateCarUseCase';
import ListAvailableCarUseCase from './ListAvailableCarUseCase';

describe('List Cars Available', () => {
  let carsRepositoryInMemory: CarsRepositoryInMemory;
  let listAvailableCarUseCase: ListAvailableCarUseCase;
  let createCarUseCase: CreateCarUseCase;
  let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
  let category: Category;

  beforeEach(async () => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();

    createCarUseCase = new CreateCarUseCase(
      carsRepositoryInMemory,
      categoriesRepositoryInMemory,
    );

    listAvailableCarUseCase = new ListAvailableCarUseCase(
      carsRepositoryInMemory,
    );

    category = await categoriesRepositoryInMemory.create({
      description: 'List Cars',
      name: 'Category to List',
    });
  });

  it('should be able to list cars availables', async () => {
    const car = await createCarUseCase.execute({
      brand: 'Audi',
      category_id: category.id,
      daily_rate: 100,
      description: 'Test',
      fine_amount: 50,
      license_plate: '123-1234',
      model: 'A3',
    });

    const cars = await listAvailableCarUseCase.execute({});

    expect(cars[0]).toBe(car);
  });

  it('should be able to list cars available by brand', async () => {
    const car = await createCarUseCase.execute({
      brand: 'Audi',
      category_id: category.id,
      daily_rate: 100,
      description: 'Test',
      fine_amount: 50,
      license_plate: '123-1234',
      model: 'A3',
    });

    const cars = await listAvailableCarUseCase.execute({ brand: car.brand });

    expect(cars[0]).toBe(car);
  });

  it('should be able to list cars available by model', async () => {
    const car = await createCarUseCase.execute({
      brand: 'Audi',
      category_id: category.id,
      daily_rate: 100,
      description: 'Test',
      fine_amount: 50,
      license_plate: '123-1234',
      model: 'A3',
    });

    const cars = await listAvailableCarUseCase.execute({ model: car.model });

    expect(cars[0]).toBe(car);
  });

  it('should be able to list cars available by category', async () => {
    const car = await createCarUseCase.execute({
      brand: 'Audi',
      category_id: category.id,
      daily_rate: 100,
      description: 'Test',
      fine_amount: 50,
      license_plate: '123-1234',
      model: 'A3',
    });

    const cars = await listAvailableCarUseCase.execute({
      category_id: car.category_id,
    });

    expect(cars[0]).toBe(car);
  });
});
