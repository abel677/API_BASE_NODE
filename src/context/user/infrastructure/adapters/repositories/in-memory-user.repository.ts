import { injectable } from 'tsyringe';
import { UserRepository } from '../../../domain/ports/user-repository';
import { User } from '../../../domain/entities/user.entity';
import { UserMapper } from '../../mappers/user.mapper';

interface UserDb {
  id?: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt: Date;
}

@injectable()
export class InMemoryUserRepository implements UserRepository {
  private _users: UserDb[] = [];

  async delete(id: string): Promise<void> {
    const update = this._users.filter((user) => user.id !== id);
    this._users = update;
  }

  async save(user: User): Promise<void> {
    const index = this._users.findIndex((u) => u.id === user.id);
    if (index === -1) {
      this._users.unshift(UserMapper.toPrismaCreate(user));
    } else {
      this._users[index] = UserMapper.toPrismaUpdate(user);
    }
  }

  async all(): Promise<User[]> {
    const users = this._users;
    return users.map((user) => User.mapToModel(user));
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = this._users.find((user) => user.email === email);
    if (!user) return null;
    return User.mapToModel(user);
  }
}
