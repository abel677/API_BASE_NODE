import express from 'express';
import morgan from 'morgan';

import userRoutes from './context/user/presentation/routes';
import { errorHandler } from './shared/error.middleware';
import { envConfig } from './config/envConfig';

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/users', userRoutes);
app.use(errorHandler);

app.set('port', envConfig.PORT);

export default app;
