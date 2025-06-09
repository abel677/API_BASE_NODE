import rateLimit from 'express-rate-limit';

export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máx 100 solicitudes por IP en ese tiempo
  message:
    'Demasiadas solicitudes desde esta IP. Intenta nuevamente más tarde.',
  standardHeaders: true,
  legacyHeaders: false,
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // solo 10 intentos de login por IP en 15 minutos
  message: 'Demasiados intentos de autenticación. Intenta más tarde.',
});
