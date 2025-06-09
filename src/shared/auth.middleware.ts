import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { ApiError } from '../utils/http-error';
import { TokenService } from '../context/auth/domain/ports/token.service';

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer '))
      throw ApiError.unauthorized('Token no proporcionado');

    const token = authHeader.split(' ')[1];

    const tokenService = container.resolve<TokenService>('TokenService');
    const payload = await tokenService.verifyAccessToken(token);

    (req as any).user = payload;

    next();
  } catch (error) {
    next(ApiError.unauthorized('Token inválido o expirado'));
  }
}
