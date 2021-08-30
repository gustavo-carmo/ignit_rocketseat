import CategoriesRepository from '../../repositories/implementations/CategoriesRepository';
import CreateCategoryController from './CreateCategoryControllert';
import CreateCategoryUseCase from './CreateCategoryUseCase';

const categoriesRepository = CategoriesRepository.getInstance();
const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
const createCategoryController = new CreateCategoryController(
  createCategoryUseCase,
);

export { createCategoryController };
