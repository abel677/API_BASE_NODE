import { container } from 'tsyringe';
import { UserRepository } from '../context/user/domain/ports/user-repository';
import { InMemoryUserRepository } from '../context/user/infrastructure/adapters/repositories/in-memory-user.repository';
import { AllUserUseCase } from '../context/user/application/use-cases/all-user.usecase';

container.registerSingleton<UserRepository>(
  'UserRepository',
  InMemoryUserRepository,
);
container.register(AllUserUseCase, { useClass: AllUserUseCase });
