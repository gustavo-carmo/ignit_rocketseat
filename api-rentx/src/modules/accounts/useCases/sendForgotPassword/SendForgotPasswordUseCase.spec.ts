import User from '@modules/accounts/infra/typeorm/entities/User';
import UsersRepositoryInMemory from '@modules/accounts/repositories/inMemory/UsersRepositoryInMemory';
import UsersTokensRepositoryInMemory from '@modules/accounts/repositories/inMemory/UsersTokensRepositoryInMemory';
import DayjsDateProvider from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import MailProviderInMemory from '@shared/container/providers/MailProvider/inMemory/MailProviderInMemory';
import AppError from '@shared/errors/AppError';

import SendForgotPasswordUseCase from './SendForgotPasswordUseCase';

describe('Send Forgot Password', () => {
  let sendForgotPaswordUseCase: SendForgotPasswordUseCase;
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
  let dateProvider: DayjsDateProvider;
  let mailProvider: MailProviderInMemory;

  let user: User;

  beforeEach(async () => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();

    sendForgotPaswordUseCase = new SendForgotPasswordUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider,
    );

    user = await usersRepositoryInMemory.create({
      driver_license: '895026538',
      email: 'user@teste.com',
      name: 'Ivan Watson',
      password: '1234',
    });
  });

  it('should to be able to send an email', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    await sendForgotPaswordUseCase.execute('user@teste.com');

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send an email to a none existent user', async () => {
    await expect(
      sendForgotPaswordUseCase.execute('none-existent-user@email.com'),
    ).rejects.toEqual(new AppError('User does not exists!'));
  });

  it('should be able to create an user token', async () => {
    const createToken = jest.spyOn(usersTokensRepositoryInMemory, 'create');

    await sendForgotPaswordUseCase.execute('user@teste.com');

    expect(createToken).toHaveBeenCalled();
  });
});
