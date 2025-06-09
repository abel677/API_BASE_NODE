import { container } from 'tsyringe';
import { UserRepository } from '../context/user/domain/ports/user-repository';
import { AllUserUseCase } from '../context/user/application/use-cases/all-user.usecase';
import { HashService } from '../context/common/domain/ports/hash.service';
import { BcryptHashService } from '../context/common/infrastructure/adapters/bcrypt.service';

import { PrismaClient } from '@prisma/client';
import { PrismaUserRepository } from '../context/user/infrastructure/adapters/repositories/prisma-user.repository';

export function configureContainer(prismaClient: PrismaClient) {
  container.registerInstance('PrismaClient', prismaClient);

  // Servicios
  container.registerSingleton<HashService>('HashService', BcryptHashService);

  // Repositorios
  container.registerSingleton<UserRepository>(
    'UserRepository',
    PrismaUserRepository,
  );

  // Casos de uso
  container.register(AllUserUseCase, { useClass: AllUserUseCase });
}