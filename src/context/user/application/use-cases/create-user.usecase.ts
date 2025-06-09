import { inject, injectable } from 'tsyringe';
import { UserRepository } from '../../domain/ports/user-repository';
import { ApiError } from '../../../../utils/http-error';
import { User } from '../../domain/entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserMapper } from '../../infrastructure/mappers/user.mapper';
import { HashService } from '../../../common/domain/ports/hash.service';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UserRepository') private userRepo: UserRepository,
    @inject('HashService') private readonly hashService: HashService,
  ) {}

  async execute(user: CreateUserDto) {
    const findUser = await this.userRepo.getByEmail(user.email);
    if (findUser) {
      throw ApiError.badRequest('Usuario no disponible');
    }

    const passwordHash = await this.hashService.hash(user.password);
    const newUser = User.create({
      name: user.name,
      email: user.email,
      password: passwordHash,
    });

    await this.userRepo.save(newUser);
    return UserMapper.responseHttp(newUser);
  }
}
