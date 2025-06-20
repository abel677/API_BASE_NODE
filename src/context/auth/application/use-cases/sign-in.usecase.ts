import { inject, injectable } from 'tsyringe';
import { UserRepository } from '../../../user/domain/ports/user-repository';
import { Application } from '../../../../utils/http-error';
import { HashService } from '../../../common/domain/ports/hash-service.port';
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
    const user = await this.userRepo.getByEmail(dto.email);
    if (!user) throw Application.unauthorized('Credenciales inválidas');
    const matchPassword = await this.hashService.compare(
      dto.password,
      user.password || "",
    );
    if (!matchPassword)
      throw Application.unauthorized('Credenciales inválidas');
    if (user.verificationToken)
      throw Application.unauthorized('Cuenta no verificada.');
    if (!user.active) throw Application.unauthorized();

    const payload = { userId: user.id };
    const { accessToken, refreshToken } =
      await this.tokenService.generateTokens(payload);

    return { accessToken, refreshToken, user };
  }
}
