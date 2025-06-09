import { Regex } from '../../../../utils/regex';

export class SignInDto {
  private constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}

  static create(body: { [key: string]: any }): [string?, SignInDto?] {
    const email = body?.email;
    const password = body?.password;

    if (!email || !Regex.email().test(email)) {
      return ['email: Credenciales inválidas.'];
    }
    if (!password) {
      return ['password: Credenciales inválidas.'];
    }
    return [undefined, new SignInDto(email, password)];
  }
}
