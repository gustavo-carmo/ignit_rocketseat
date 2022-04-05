import ICreateUserTokenDTO from '../dtos/ICreateUserTokenDTO';
import UserToken from '../infra/typeorm/entities/UserToken';

export interface IFindUserToken {
  user_id: string;
  refresh_token: string;
}

export default interface IUsersTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<UserToken>;
  findByIdAndRefreshToken(data: IFindUserToken): Promise<UserToken | undefined>;
  delete(id: string): Promise<void>;
  findByRefreshToken(refresh_token: string): Promise<UserToken | undefined>;
}
