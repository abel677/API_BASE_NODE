import { User } from '../../domain/entities/user.entity';

export class UserMapper {
  static responseHttp(user: User) {
    return {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
