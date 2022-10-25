import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import {
  expires_in_refresh_token,
  expires_in_refresh_token_days,
  expires_in_token,
  secret_refresh_token,
  secret_token,
} from '@config/auth';
import IUsersTokensRepository from '@modules/accounts/repositories/IUsersTokensRepository';
import IDateProvider from '@shared/container/providers/DateProvider/IDateProvider';
import AppError from '@shared/errors/AppError';

interface IPayload {
  sub: string;
  email: string;
}

interface IRefreshTokenResponse {
  refresh_token: string;
  token: string;
}

@injectable()
export default class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute(token: string): Promise<IRefreshTokenResponse> {
    const { sub: user_id, email } = verify(
      token,
      secret_refresh_token,
    ) as IPayload;

    const userToken = await this.usersTokensRepository.findByIdAndRefreshToken({
      user_id,
      refresh_token: token,
    });

    if (!userToken) {
      throw new AppError('Refresh Token does not exists!');
    }

    await this.usersTokensRepository.delete(userToken.id);

    const refresh_token = sign(
      {
        email,
      },
      secret_refresh_token,
      {
        subject: user_id,
        expiresIn: expires_in_refresh_token,
      },
    );

    const expires_date = this.dateProvider.addDays(
      expires_in_refresh_token_days,
    );

    await this.usersTokensRepository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    const newToken = sign({}, secret_token, {
      subject: user_id,
      expiresIn: expires_in_token,
    });

    return { refresh_token, token: newToken };
  }
}
