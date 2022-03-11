import CarsRepositoryInMemory from '@modules/cars/repositories/inMemory/CarsRepositoryInMemory';
import CategoriesRepositoryInMemory from '@modules/cars/repositories/inMemory/CategoriesRepositoryInMemory';
import SpecificationsRepositoryInMemory from '@modules/cars/repositories/inMemory/SpecificationsRepositoryInMemory';
import AppError from '@shared/errors/AppError';

import CreateSpecificationCarUseCase from './CreateSpecificationCarUseCase';

describe('Create specification to a Car', () => {
  let createSpecificationCarUseCase: CreateSpecificationCarUseCase;
  let carsRepositoryInMemory: CarsRepositoryInMemory;
  let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
  let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();

    createSpecificationCarUseCase = new CreateSpecificationCarUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory,
    );
  });

  it('should be able to create a specification', async () => {
    const category = await categoriesRepositoryInMemory.create({
      description: '',
      name: 'Category',
    });

    const car = await carsRepositoryInMemory.create({
      model: 'Model Car',
      brand: 'Brand Car',
      description: 'Description Car Test',
      license_plate: 'A98-XE08',
      daily_rate: 100,
      fine_amount: 50,
      category_id: category.id,
    });

    const specification = await specificationsRepositoryInMemory.create({
      description: 'Specification',
      name: 'Specification',
    });

    await createSpecificationCarUseCase.execute({
      car_id: car.id,
      specifications_id: [specification.id],
    });

    expect(car).toHaveProperty('specifications');
    expect(car.specifications.length).toBe(1);
  });

  it('should not be able to create a specification with a non existing car', async () => {
    expect(async () => {
      await createSpecificationCarUseCase.execute({
        car_id: 'car-does-not-exists',
        specifications_id: ['1231'],
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
