import { injectable } from 'tsyringe';
import { UserRepository } from '../../../domain/ports/user-repository';
import { User } from '../../../domain/entities/user.entity';

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

  private mapToDb(user: User): UserDb {
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
  private mapToModel(user: UserDb): User {
    return User.mapToModel(user);
  }

  async save(user: User): Promise<void> {
    const mapUser = this.mapToDb(user);
    const index = this._users.findIndex((u) => u.id === mapUser.id);
    if (index === -1) {
      this._users.unshift(mapUser);
    } else {
      this._users[index] = mapUser;
    }
  }

  async all(): Promise<User[]> {
    const users = this._users;
    return users.map((user) => this.mapToModel(user));
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = this._users.find((user) => user.email === email);
    if (!user) return null;
    return this.mapToModel(user);
  }
}
