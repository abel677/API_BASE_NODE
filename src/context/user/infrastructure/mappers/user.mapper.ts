import { User } from '../../domain/entities/user.entity';

export class UserMapper {
  // Para respuesta HTTP (lo que ya tienes)
  static responseHttp(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  // Mapea para crear un usuario en DB (Prisma create)
  static toPrismaCreate(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  // Mapea para actualizar usuario en DB (Prisma update)
  static toPrismaUpdate(user: User) {
    return {
      name: user.name,
      email: user.email,
      password: user.password,
      updatedAt: user.updatedAt,
    };
  }
}
