import { getRepository, Repository } from 'typeorm';

import ICategoriesRepository, {
  ICreateCategoryDTO,
} from '@modules/cars/repositories/ICategoriesRepository';

import Category from '../entities/Category';

export default class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;
  constructor() {
    this.repository = getRepository(Category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category | undefined> {
    const category = await this.repository.findOne({
      where: {
        name,
      },
    });

    return category;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = this.repository.create({
      description,
      name,
    });

    await this.repository.save(category);

    return category;
  }
}
