import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AllUserUseCase } from '../application/use-cases/all-user.usecase';
import { CreateUserUseCase } from '../application/use-cases/create-user.usecase';
import { CreateUserDto } from '../application/dtos/create-user.dto';
import { ApiError } from '../../../utils/http-error';
import { UserMapper } from '../infrastructure/mappers/user.mapper';
import { UpdateUserDto } from '../application/dtos/update-user.dto';
import { UpdateUserUseCase } from '../application/use-cases/update-user.usecase';
import { DeleteManyUserUseCase } from '../application/use-cases/delete-many-user.usecase';
import { DeleteManyUserDto } from '../application/dtos/delete-all-user.dto';
import { GetProfileUseCase } from '../application/use-cases/get-profile.usecase';

export const profile = async (req: Request, res: Response) => {
  const id = (req as any).user.id;

  const useCase = container.resolve(GetProfileUseCase);
  const user = await useCase.execute(id);
  res.json(UserMapper.responseHttp(user));
};

export const all = async (req: Request, res: Response) => {
  const useCase = container.resolve(AllUserUseCase);
  const users = await useCase.execute();
  res.json(users.map((user) => UserMapper.responseHttp(user)));
};

export const deleteMany = async (req: Request, res: Response) => {
  const [error, dto] = DeleteManyUserDto.create(req.body);
  if (error) {
    throw ApiError.badRequest(error);
  }

  const useCase = container.resolve(DeleteManyUserUseCase);
  await useCase.execute(dto!);
  res.json({
    message: 'Usuarios eliminado.',
  });
};

export const deleteOne = async (req: Request, res: Response) => {
  const id = req.params.id;

  const useCase = container.resolve(DeleteManyUserUseCase);
  await useCase.execute({ users: [{ id }] });
  res.json({
    message: 'Usuario eliminado.',
  });
};

export const update = async (req: Request, res: Response) => {
  const id = req.params.id;
  const [error, dto] = UpdateUserDto.create(req.body);
  if (error) {
    throw ApiError.badRequest(error);
  }
  const useCase = container.resolve(UpdateUserUseCase);
  const user = await useCase.execute(id, dto!);
  res.json({
    message: 'Usuario actualizado.',
    user: UserMapper.responseHttp(user),
  });
};

export const create = async (req: Request, res: Response) => {
  const [error, dto] = CreateUserDto.create(req.body);
  if (error) {
    throw ApiError.badRequest(error);
  }
  const useCase = container.resolve(CreateUserUseCase);
  const user = await useCase.execute(dto!);
  res.json({
    message: 'Usuario registrado.',
    user: UserMapper.responseHttp(user),
  });
};
