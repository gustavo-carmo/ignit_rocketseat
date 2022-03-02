import CategoriesRepositoryInMemory from '@modules/cars/repositories/inMemory/CategoriesRepositoryInMemory';
import AppError from '@shared/errors/AppError';

import CreateCategoryUseCase from './CreateCategoryUseCase';

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

describe('Create category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory,
    );
  });

  it('should be able to create a new category', async () => {
    const categoryToCreate = {
      name: 'Category Test',
      description: 'Category Description Test',
    };

    const category = await createCategoryUseCase.execute({
      name: categoryToCreate.name,
      description: categoryToCreate.description,
    });

    expect(category).toHaveProperty('id');
    expect(category.name).toEqual(categoryToCreate.name);
    expect(category.description).toEqual(categoryToCreate.description);
  });

  it("shouldn't be able to create a category with a name that already exists", async () => {
    expect(async () => {
      const categoryToCreate = {
        name: 'Category Test',
        description: 'Category Description Test',
      };

      await createCategoryUseCase.execute({
        name: categoryToCreate.name,
        description: categoryToCreate.description,
      });

      await createCategoryUseCase.execute({
        name: categoryToCreate.name,
        description: categoryToCreate.description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
