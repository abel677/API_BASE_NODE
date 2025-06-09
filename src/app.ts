import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import { errorHandler } from './shared/error.middleware';
import { envConfig } from './config/envConfig';

import userRoutes from './context/user/presentation/routes';
import rolRoutes from './context/rol/presentation/routes';
import authRouts from './context/auth/presentation/routes';
import welcomeRouts from './welcome.routes';
import { apiRateLimiter, authLimiter } from './config/rate-limit';
import helmet from 'helmet';

const app = express();

// Seguridad primero
app.use(helmet({ contentSecurityPolicy: false }));
app.use(apiRateLimiter);

// Middleware de parsing
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// Logs
app.use(morgan('dev'));

// Rutas
const prefix = '/api/v1';
app.use(`${prefix}/auth`, authLimiter, authRouts);
app.use(`${prefix}/users`, userRoutes);
app.use(`${prefix}/roles`, rolRoutes);
app.use('/', welcomeRouts);

// Manejador de errores
app.use(errorHandler);

// Puerto
app.set('port', envConfig.PORT);

export default app;
