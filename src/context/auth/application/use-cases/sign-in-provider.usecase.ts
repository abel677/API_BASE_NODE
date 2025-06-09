import { inject, injectable } from 'tsyringe';
import { UserRepository } from '../../../user/domain/ports/user-repository';
import { Application } from '../../../../utils/http-error';
import { TokenService } from '../../domain/ports/token.service';
import { User } from '../../../user/domain/entities/user.entity';

@injectable()
export class SignInProviderUseCase {
  constructor(
    @inject('UserRepository') private readonly userRepo: UserRepository,
    @inject('TokenService') private readonly tokenService: TokenService,
  ) {}

  async execute(dto: { email: string; name: string }) {
    let user = await this.userRepo.getByEmail(dto.email);
    if (!user) {
      user = User.create({
        email: dto.email,
        name: dto.name || dto.email,
        provider: 'Google',
        roles: [],
      });
      await this.userRepo.save(user);
    }

    if (!user) throw Application.unauthorized('Credenciales inválidas');
    if (!user.active) throw Application.unauthorized();

    const payload = { userId: user.id };
    const { accessToken, refreshToken } =
      await this.tokenService.generateTokens(payload);

    return { accessToken, refreshToken, user };
  }
}
