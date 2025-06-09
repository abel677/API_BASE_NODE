import { Regex } from '../../../../utils/regex';

export class SignInProviderDto {
  private constructor(
    public readonly email: string,
    public readonly name: string,
  ) {}

  static create(body: { [key: string]: any }): [string?, SignInProviderDto?] {
    const email = body?.email;
    const name = body?.name;

    if (!email || !Regex.email().test(email)) {
      return ['email: Credenciales inválidas.'];
    }
    return [undefined, new SignInProviderDto(email, name)];
  }
}
