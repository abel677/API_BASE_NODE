import { Request, Response } from 'express';
import { SignInDto } from '../application/dtos/sign-in.dto';
import { ApiError } from '../../../utils/http-error';
import { container } from 'tsyringe';
import { SignInUseCase } from '../application/use-cases/sign-in.usecase';
import { envConfig } from '../../../config/envConfig';
import { TokenService } from '../domain/ports/token.service';

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) throw ApiError.unauthorized('No hay token');

    const tokenSvc = container.resolve<TokenService>('TokenService');

    const payload = await tokenSvc.verifyRefreshToken(refreshToken);
    const newTokens = await tokenSvc.generateTokens(payload);

    res.cookie('refreshToken', newTokens.refreshToken, {
      httpOnly: true,
      secure: envConfig.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: Number(envConfig.REFRESH_TOKEN_EXP_DAYS),
    });
    res.json({ accessToken: newTokens.accessToken });
  } catch (err) {
    throw ApiError.unauthorized('No autorizado');
  }
};

export const signIn = async (req: Request, res: Response) => {
  const [error, dto] = SignInDto.create(req.body);
  if (error) throw ApiError.badRequest(error);
  const useCase = container.resolve(SignInUseCase);
  const { accessToken, refreshToken } = await useCase.execute(dto!);
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: envConfig.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: Number(envConfig.REFRESH_TOKEN_EXP_DAYS),
  });

  res.json({
    accessToken: accessToken,
  });
};
