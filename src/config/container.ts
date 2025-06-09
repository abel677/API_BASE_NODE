import { container } from 'tsyringe';
import { UserRepository } from '../context/user/domain/ports/user-repository';
import { AllUserUseCase } from '../context/user/application/use-cases/all-user.usecase';
import { HashService } from '../context/common/domain/ports/hash.service';
import { BcryptHashService } from '../context/common/infrastructure/adapters/bcrypt.service';

import { PrismaClient } from '@prisma/client';
import { PrismaUserRepository } from '../context/user/infrastructure/adapters/repositories/prisma-user.repository';
import { PrismaRolRepository } from '../context/rol/infrastructure/adapters/prisma-rol.repository';
import { RolRepository } from '../context/rol/domain/ports/rol.repository';
import { ByIdsRolUseCase } from '../context/rol/application/use-cases/by-ids-rol.usecase';
import { DeleteManyUserUseCase } from '../context/user/application/use-cases/delete-many-user.usecase';
import { AllRolUseCase } from '../context/rol/application/use-cases/all-rol.usecase';

export function configureContainer(prismaClient: PrismaClient) {
  container.registerInstance('PrismaClient', prismaClient);

  // Servicios
  container.registerSingleton<HashService>('HashService', BcryptHashService);

  // Repositorios
  container.registerSingleton<UserRepository>(
    'UserRepository',
    PrismaUserRepository,
  );
  container.registerSingleton<RolRepository>(
    'RolRepository',
    PrismaRolRepository,
  );

  // Casos de uso
  container.registerSingleton<AllUserUseCase>('AllUserUseCase', AllUserUseCase);
  container.registerSingleton<ByIdsRolUseCase>(
    'ByIdsRolUseCase',
    ByIdsRolUseCase,
  );
  container.registerSingleton<DeleteManyUserUseCase>(
    'DeleteManyUserUseCase',
    DeleteManyUserUseCase,
  );
  container.registerSingleton<AllRolUseCase>('AllRolUseCase', AllRolUseCase);
}
