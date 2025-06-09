import { User } from '../entities/user.entity';

export interface UserRepository {
  all(): Promise<User[]>;
  delete(id: string): Promise<void>;
  save(user: User): Promise<void>;
  getByEmail(email: string): Promise<User | null>;
}
