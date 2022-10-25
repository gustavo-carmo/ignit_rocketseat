import { injectable, inject } from 'tsyringe';

import Specification from '@modules/cars/infra/typeorm/entities/Specification';
import ISpecificationsRepository from '@modules/cars/repositories/ISpecificationsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export default class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  async execute({ name, description }: IRequest): Promise<Specification> {
    const categoryAlreadyExists =
      await this.specificationsRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new AppError('Specification already exists!');
    }

    const category = this.specificationsRepository.create({
      name,
      description,
    });

    return category;
  }
}
