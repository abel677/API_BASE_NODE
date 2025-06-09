import { inject, injectable } from 'tsyringe';
import { UserRepository } from '../../domain/ports/user-repository';
import { DeleteManyUserDto } from '../dtos/delete-all-user.dto';
import { ApiError } from '../../../../utils/http-error';

@injectable()
export class DeleteManyUserUseCase {
  constructor(
    @inject('UserRepository') private readonly userRepo: UserRepository,
  ) {}

  async execute(dto: DeleteManyUserDto) {
    const users = await this.userRepo.allByIds(dto.users);

    const requestedIds = dto.users.map((u) => u.id);
    const foundIds = users.map((u) => u.id);
    const notFoundIds = requestedIds.filter((id) => !foundIds.includes(id));

    if (notFoundIds.length > 0) {
      throw ApiError.badRequest(
        `Los siguientes usuarios no disponibles: ${notFoundIds.join(', ')}`,
      );
    }
    await this.userRepo.deleteAll(dto.users);
  }
}
