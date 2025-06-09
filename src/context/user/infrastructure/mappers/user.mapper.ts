import { Prisma } from '@prisma/client';
import { RolMapper } from '../../../rol/infrastructure/mappers/rol.mapper';
import { User } from '../../domain/entities/user.entity';

export class UserMapper {
  // Para respuesta HTTP (lo que ya tienes)
  static responseHttp(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      active: user.active,
      provider: user.provider,
      roles: user.roles.map((rol) => RolMapper.responseHttp(rol)),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  // Mapea para crear un usuario en DB (Prisma create)
  static toPrismaCreate(user: User): Prisma.UserCreateInput {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      provider: user.provider,
      active: user.active,
      verificationToken: user.verificationToken,
      roles: {
        connect: user.roles.map((role) => ({
          id: role.id,
        })),
      },
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  // Mapea para actualizar usuario en DB (Prisma update)
  static toPrismaUpdate(user: User) {
    return {
      name: user.name,
      email: user.email,
      active: user.active,
      provider: user.provider,
      verificationToken: user.verificationToken,
      roles: {
        connect: user.roles.map((role) => ({
          id: role.id,
        })),
      },
      password: user.password,
      updatedAt: user.updatedAt,
    };
  }
}
