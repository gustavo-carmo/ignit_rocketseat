import Specification from '../../models/Specification';
import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

interface IRequest {
  name: string;
  description: string;
}

export default class CreateSpecificationUseCase {
  constructor(private specificationRepository: ISpecificationsRepository) {}

  execute({ name, description }: IRequest): Specification {
    const categoryAlreadyExists = this.specificationRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error('Specification already exists!');
    }

    const category = this.specificationRepository.create({ name, description });

    return category;
  }
}
