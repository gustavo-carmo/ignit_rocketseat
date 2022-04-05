import ICreateUserDTO from '@modules/accounts/dtos/IcreateUserDTO';
import User from '@modules/accounts/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

import IUsersRepository from '../IUsersRepository';

export default class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({
    driver_license,
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { driver_license, email, name, password });

    this.users.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new AppError("User did'nt found");
    }

    return user;
  }
}
