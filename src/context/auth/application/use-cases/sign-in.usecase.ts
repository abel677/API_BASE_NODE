import { inject, injectable } from 'tsyringe';
import { UserRepository } from '../../../user/domain/ports/user-repository';
import { ApiError } from '../../../../utils/http-error';
import { HashService } from '../../../common/domain/ports/hash.service';
import { TokenService } from '../../domain/ports/token.service';
import { SignInDto } from '../dtos/sign-in.dto';

@injectable()
export class SignInUseCase {
  constructor(
    @inject('UserRepository') private readonly userRepo: UserRepository,
    @inject('HashService') private readonly hashService: HashService,
    @inject('TokenService') private readonly tokenService: TokenService,
  ) {}

  async execute(dto: SignInDto) {
    const user = await this.userRepo.getByEmailOrName(dto.email);
    if (!user) throw ApiError.unauthorized('Credenciales inválidas');

    const matchPassword = await this.hashService.compare(
      dto.password,
      user.password,
    );
    if (!matchPassword) throw ApiError.unauthorized('Credenciales inválidas');

    const payload = { userId: user.id };
    const { accessToken, refreshToken } =
      await this.tokenService.generateTokens(payload);

    return { accessToken, refreshToken };
  }
}
