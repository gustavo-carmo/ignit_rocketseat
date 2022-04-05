import ICreateUserDTO from '@modules/accounts/dtos/IcreateUserDTO';
import UsersRepositoryInMemory from '@modules/accounts/repositories/inMemory/UsersRepositoryInMemory';
import UsersTokensRepositoryInMemory from '@modules/accounts/repositories/inMemory/UsersTokensRepositoryInMemory';
import DayjsDateProvider from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import AppError from '@shared/errors/AppError';

import CreateUserUseCase from '../createUser/CreateUserUseCase';
import AuthenticateUserUseCase from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe('Authenticate user', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should to be able to authenticate', async () => {
    const userToCreate: ICreateUserDTO = {
      driver_license: '0012',
      email: 'user@test.com',
      name: 'User Test',
      password: '1234',
    };

    await createUserUseCase.execute(userToCreate);

    const result = await authenticateUserUseCase.execute({
      email: userToCreate.email,
      password: userToCreate.password,
    });

    expect(result).toHaveProperty('token');
  });

  it("shouldn't be able to authenticate an user did'nt exists", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'false@email.com',
        password: '1234',
      }),
    ).rejects.toEqual(new AppError('Email or password incorrect!'));
  });

  it("shouldn't be able to authenticate an user with wrong password", async () => {
    const userToCreate: ICreateUserDTO = {
      driver_license: '0012',
      email: 'user@test.com',
      name: 'User Test',
      password: '1234',
    };

    await createUserUseCase.execute(userToCreate);

    await expect(
      authenticateUserUseCase.execute({
        email: userToCreate.email,
        password: 'wrongPassword',
      }),
    ).rejects.toEqual(new AppError('Email or password incorrect!'));
  });
});
