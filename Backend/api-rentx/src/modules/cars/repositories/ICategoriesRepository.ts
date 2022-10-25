import Category from '../infra/typeorm/entities/Category';

export interface ICreateCategoryDTO {
  name: string;
  description: string;
}

export default interface ICategoriesRepository {
  list(): Promise<Category[]>;
  create(data: ICreateCategoryDTO): Promise<Category>;
  findByName(name: string): Promise<Category | undefined>;
  findById(id: string): Promise<Category | undefined>;
}
