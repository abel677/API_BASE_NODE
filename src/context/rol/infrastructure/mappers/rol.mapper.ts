import { Rol } from '../../domain/entities/rol.entity';

export class RolMapper {
  static responseHttp(rol: Rol) {
    return {
      id: rol.id,
      name: rol.name,
      createdAt: rol.createdAt,
      updatedAt: rol.updatedAt,
    };
  }
}
