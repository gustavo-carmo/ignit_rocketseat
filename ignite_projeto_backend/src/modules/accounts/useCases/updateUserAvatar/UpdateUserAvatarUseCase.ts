import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/accounts/repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/IStorageProvider';

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
export default class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (user.avatar) {
      await this.storageProvider.delete({
        file: user.avatar,
        folder: 'avatar',
      });
    }

    await this.storageProvider.save({
      file: avatar_file,
      folder: 'avatar',
    });

    if (avatar_file) {
      user.avatar = avatar_file;
    }

    await this.usersRepository.create(user);
  }
}
