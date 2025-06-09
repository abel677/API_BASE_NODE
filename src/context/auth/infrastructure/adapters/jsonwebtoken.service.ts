import jwt from 'jsonwebtoken';
import {
  TokenPair,
  TokenPayload,
  TokenService,
} from '../../domain/ports/token.service';
import { envConfig } from '../../../../config/envConfig';

export class JwtTokenService implements TokenService {
  async generateTokens(payload: TokenPayload): Promise<TokenPair> {
    const accessToken = jwt.sign(payload, envConfig.ACCESS_SECRET, {
      expiresIn: '1m',
    });
    const refreshToken = jwt.sign(payload, envConfig.REFRESH_SECRET, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  async verifyAccessToken(token: string): Promise<TokenPayload> {
    return jwt.verify(token, envConfig.ACCESS_SECRET) as TokenPayload;
  }

  async verifyRefreshToken(token: string): Promise<TokenPayload> {
    return jwt.verify(token, envConfig.REFRESH_SECRET) as TokenPayload;
  }
}
