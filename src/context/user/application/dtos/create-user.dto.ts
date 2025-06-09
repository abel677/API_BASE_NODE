import { Regex } from '../../../../utils/regex';

export class CreateUserDto {
  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
  ) {}

  static create(body: { [key: string]: any }): [string?, CreateUserDto?] {
    const name = body?.name;
    const email = body?.email;
    const password = body?.password;

    if (!name) {
      return ['name: Nombre requerido.'];
    }
    if (!email) {
      return ['email: Correo electrónico requerido.'];
    }
    if (!Regex.email().test(email)) {
      return ['email: Correo electrónico inválido.'];
    }

    if (!Regex.password().test(password)) {
      return [
        'password: La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una letra minúscula, un número y un carácter especial.',
      ];
    }

    return [undefined, new CreateUserDto(name, email, password)];
  }
}
