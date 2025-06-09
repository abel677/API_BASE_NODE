import { inject, injectable } from 'tsyringe';
import { User } from '../../../domain/entities/user.entity';
import { UserRepository } from '../../../domain/ports/user-repository';
import { PrismaClient } from '@prisma/client';
import { UserMapper } from '../../mappers/user.mapper';

@injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(@inject('PrismaClient') private prisma: PrismaClient) {}

  async all(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => User.mapToModel(user));
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }

  async save(user: User): Promise<void> {
    await this.prisma.user.upsert({
      where: { id: user.id },
      create: UserMapper.toPrismaCreate(user),
      update: UserMapper.toPrismaUpdate(user),
    });
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        roles: true,
      },
    });
    if (!user) return null;
    return User.mapToModel(user);
  }
}
