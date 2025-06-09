import { inject, injectable } from 'tsyringe';
import { User } from '../../../domain/entities/user.entity';
import { UserRepository } from '../../../domain/ports/user-repository';
import { PrismaClient } from '@prisma/client';
import { UserMapper } from '../../mappers/user.mapper';

@injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(@inject('PrismaClient') private prisma: PrismaClient) {}

  async all(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      include: { roles: true },
      orderBy: { updatedAt: 'desc' },
    });
    return users.map((user) => User.mapToModel(user));
  }

  async allByIds(ids: { id: string }[]): Promise<User[]> {
    const idList = ids.map((item) => item.id);

    const users = await this.prisma.user.findMany({
      where: {
        id: {
          in: idList,
        },
      },
      include: {
        roles: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return users.map((user) => User.mapToModel(user));
  }

  async deleteAll(ids: { id: string }[]): Promise<void> {
    const idList = ids.map((item) => item.id);

    await this.prisma.user.deleteMany({
      where: {
        id: {
          in: idList,
        },
      },
    });
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

  async getById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        roles: true,
      },
    });
    if (!user) return null;
    return User.mapToModel(user);
  }

  async getByEmailOrName(emailOrName: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ name: emailOrName }, { email: emailOrName }],
      },
      include: {
        roles: true,
      },
    });

    if (!user) return null;
    return User.mapToModel(user);
  }

  async getByName(name: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { name },
      include: {
        roles: true,
      },
    });
    if (!user) return null;
    return User.mapToModel(user);
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
