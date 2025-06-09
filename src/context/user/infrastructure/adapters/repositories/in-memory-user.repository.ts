import { injectable } from 'tsyringe';
import { UserRepository } from '../../../domain/ports/user-repository';
import { User } from '../../../domain/entities/user.entity';
import { UserMapper } from '../../mappers/user.mapper';

interface UserDb {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

@injectable()
export class InMemoryUserRepository implements UserRepository {
  constructor() {}

  private _users: UserDb[] = [];

  async save(user: User): Promise<void> {
    const mapUser = UserMapper.mapToPersistence(user);
    const index = this._users.findIndex((u) => u.id === mapUser.id);
    if (index === -1) {
      this._users.unshift(mapUser);
    } else {
      this._users[index] = mapUser;
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
