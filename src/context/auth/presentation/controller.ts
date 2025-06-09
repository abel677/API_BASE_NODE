import { Request, Response } from 'express';
import { SignInDto } from '../application/dtos/sign-in.dto';
import { Application } from '../../../utils/http-error';
import { container } from 'tsyringe';
import { SignInUseCase } from '../application/use-cases/sign-in.usecase';
import { envConfig } from '../../../config/envConfig';
import { TokenService } from '../domain/ports/token.service';
import { VerifyUseCase } from '../application/use-cases/verify.usecase';
import { UserMapper } from '../../user/infrastructure/mappers/user.mapper';
import { SignInProviderDto } from '../application/dtos/sign-in-provider.dto';
import { SignInProviderUseCase } from '../application/use-cases/sign-in-provider.usecase';

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) throw Application.unauthorized('No hay token');

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
    throw Application.unauthorized('No autorizado');
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: envConfig.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  res.json({ message: 'Sesión cerrada' });
};

export const verify = async (req: Request, res: Response) => {
  const verificationToken = req.params.verificationToken;
  const useCase = container.resolve(VerifyUseCase);
  await useCase.execute(verificationToken);
  res.json({
    message: 'Cuenta verificada, ya puedes iniciar sesión.',
  });
};

export const signInProvider = async (req: Request, res: Response) => {
  const [error, dto] = SignInProviderDto.create(req.body);
  if (error) throw Application.badRequest(error);

  const useCase = container.resolve(SignInProviderUseCase);
  const { accessToken, refreshToken, user } = await useCase.execute(dto!);
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: envConfig.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: Number(envConfig.REFRESH_TOKEN_EXP_DAYS),
  });

  res.json({
    message: 'Inicio de sesión exitoso.',
    accessToken: accessToken,
    user: UserMapper.responseHttp(user),
  });
};

export const signIn = async (req: Request, res: Response) => {
  const [error, dto] = SignInDto.create(req.body);
  if (error) throw Application.badRequest(error);
  const useCase = container.resolve(SignInUseCase);
  const { accessToken, refreshToken, user } = await useCase.execute(dto!);
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: envConfig.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: Number(envConfig.REFRESH_TOKEN_EXP_DAYS),
  });

  res.json({
    message: 'Inicio de sesión exitoso.',
    accessToken: accessToken,
    user: UserMapper.responseHttp(user),
  });
};
