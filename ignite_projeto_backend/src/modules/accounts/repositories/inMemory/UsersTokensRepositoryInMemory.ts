import ICreateUserTokenDTO from '@modules/accounts/dtos/ICreateUserTokenDTO';
import UserToken from '@modules/accounts/infra/typeorm/entities/UserToken';

import IUsersTokensRepository, {
  IFindUserToken,
} from '../IUsersTokensRepository';

export default class UsersTokensRepositoryInMemory
  implements IUsersTokensRepository
{
  private usersTokens: UserToken[] = [];

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id,
    });

    this.usersTokens.push(userToken);

    return userToken;
  }

  async findByIdAndRefreshToken({
    refresh_token,
    user_id,
  }: IFindUserToken): Promise<UserToken | undefined> {
    const userToken = await this.usersTokens.find(
      (userToken) =>
        userToken.refresh_token === refresh_token &&
        userToken.user_id === user_id,
    );

    return userToken;
  }

  async delete(id: string): Promise<void> {
    this.usersTokens.splice(
      this.usersTokens.findIndex((userToken) => userToken.id === id),
      1,
    );
  }

  async findByRefreshToken(
    refresh_token: string,
  ): Promise<UserToken | undefined> {
    const userToken = this.usersTokens.find(
      (userToken) => userToken.refresh_token === refresh_token,
    );

    return userToken;
  }
}
