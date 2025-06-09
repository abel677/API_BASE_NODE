import { Rol } from '../entities/rol.entity';

export interface RolRepository {
  all(): Promise<Rol[]>
  getByIds(ids: { id: string }[]): Promise<Rol[]>;
}
