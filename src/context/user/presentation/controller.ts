import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AllUserUseCase } from '../application/use-cases/all-user.usecase';
import { CreateUserUseCase } from '../application/use-cases/create-user.usecase';
import { CreateUserDto } from '../application/dtos/create-user.dto';
import { ApiError } from '../../../utils/http-error';

export const all = async (req: Request, res: Response) => {
  const useCase = container.resolve(AllUserUseCase);
  const result = await useCase.execute();
  res.json(result);
};

export const create = async (req: Request, res: Response) => {
  const [error, dto] = CreateUserDto.create(req.body);
  if (error) {
    throw ApiError.badRequest(error);
  }
  const useCase = container.resolve(CreateUserUseCase);
  const result = await useCase.execute(dto!);
  res.json(result);
};
