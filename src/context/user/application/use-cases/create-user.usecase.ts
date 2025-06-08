import { inject, injectable } from 'tsyringe';
import { UserRepository } from '../../domain/ports/user-repository';
import { ApiError } from '../../../../utils/http-error';
import { User } from '../../domain/entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserMapper } from '../../infrastructure/mappers/user.mapper';

@injectable()
export class CreateUserUseCase {
  constructor(@inject('UserRepository') private userRepo: UserRepository) {}

  async execute(user: CreateUserDto) {
    const findUser = await this.userRepo.getByEmail(user.email);
    if (findUser) {
      throw ApiError.badRequest('Usuario no disponible');
    }
    const newUser = User.create({
      email: user.email,
      password: user.password, // todo: hash la contraseña
    });
    await this.userRepo.save(newUser);
    return UserMapper.responseHttp(newUser);
  }
}
