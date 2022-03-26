import { getRepository, Repository } from 'typeorm';

import ICreateUserTokenDTO from '@modules/accounts/dtos/ICreateUserTokenDTO';
import IUsersTokensRepository, {
  IFindUserToken,
} from '@modules/accounts/repositories/IUsersTokensRepository';

import UserToken from '../entities/UserToken';

export default class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = getRepository(UserToken);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByIdAndRefreshToken({
    refresh_token,
    user_id,
  }: IFindUserToken): Promise<UserToken | undefined> {
    const userToken = await this.repository.findOne({
      where: {
        refresh_token,
        user_id,
      },
    });

    return userToken;
  }

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = this.repository.create({
      user_id,
      refresh_token,
      expires_date,
    });

    await this.repository.save(userToken);

    return userToken;
  }
}
