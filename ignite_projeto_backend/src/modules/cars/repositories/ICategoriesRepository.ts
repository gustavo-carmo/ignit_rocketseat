import Category from '../models/Category';

export interface ICreateCategoryDTO {
  name: string;
  description: string;
}

export interface ICategoriesRepository {
  list(): Category[];
  create(data: ICreateCategoryDTO): Category;
  findByName(name: string): Category | undefined;
}
