import { getRepository, Repository } from 'typeorm';

import ISpecificationsRepository, {
  ICreateSpecificationDTO,
} from '@modules/cars/repositories/ISpecificationsRepository';

import Specification from '../entities/Specification';

export default class SpecificationsRepository
  implements ISpecificationsRepository
{
  private repository: Repository<Specification>;
  constructor() {
    this.repository = getRepository(Specification);
  }

  async list(): Promise<Specification[]> {
    const specifications = await this.repository.find();
    return specifications;
  }

  async findByName(name: string): Promise<Specification | undefined> {
    const specification = await this.repository.findOne({
      where: {
        name,
      },
    });

    return specification;
  }

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({
      description,
      name,
    });

    await this.repository.save(specification);

    return specification;
  }
}
