import Category from '@modules/cars/infra/typeorm/entities/Category';

import ICategoriesRepository, {
  ICreateCategoryDTO,
} from '../ICategoriesRepository';

export default class CategoriesRepositoryInMemory
  implements ICategoriesRepository
{
  categories: Category[] = [];

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
    });

    this.categories.push(category);

    return category;
  }

  async findByName(name: string): Promise<Category | undefined> {
    const category = await this.categories.find(
      (category) => category.name === name,
    );

    return category;
  }
}
