import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import ICreateUserDTO from '@modules/accounts/dtos/IcreateUserDTO';
import User from '@modules/accounts/infra/typeorm/entities/User';
import IUsersRepository from '@modules/accounts/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

@injectable()
export default class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    name,
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<User> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('User already exists!');
    }

    const passwordHashed = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      password: passwordHashed,
      email,
      driver_license,
    });

    return user;
  }
}
