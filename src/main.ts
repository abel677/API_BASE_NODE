import 'reflect-metadata';
import app from './app';
import { envConfig } from './config/envConfig';
import { Database } from './config/database';
import { configureContainer } from './config/container';

(async () => {
  try {
    await Database.connect();
    console.log('✅ Base de datos conectada');

    const prisma = Database.getClient();
    configureContainer(prisma);

    app.listen(envConfig.PORT, () => {
      console.log(`🚀 API corriendo en puerto: ${envConfig.PORT}`);
    });
  } catch (err) {
    console.error(`❌ Error al conectar con la DB: ${err}`);
    process.exit(1);
  }
})();
