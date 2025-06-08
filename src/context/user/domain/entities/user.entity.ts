import { ApiError } from '../../../../utils/http-error';

interface UserProps {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
interface UserCreate extends Omit<UserProps, 'createdAt' | 'updatedAt'> {}

export class User {
  private constructor(
    public id: string,
    private props: UserProps,
  ) {}
  static mapToModel(user: { [key: string]: any }) {
    if (!user.id) {
      throw ApiError.badRequest('Missing ID');
    }
    if (!user.email) {
      throw ApiError.badRequest('Missing email');
    }
    if (!user.password) {
      throw ApiError.badRequest('Missing password');
    }
    if (!user.createdAt) {
      throw ApiError.badRequest('Missing createdAt');
    }
    if (!user.updatedAt) {
      throw ApiError.badRequest('Missing updatedAt');
    }
    return new User(user.id, {
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }
  static create(user: UserCreate) {
    const id = crypto.randomUUID();
    const currentDate = new Date();
    return new User(id, {
      email: user.email,
      password: user.password,
      createdAt: currentDate,
      updatedAt: currentDate,
    });
  }
  updateEmail(password: string) {
    this.props.email = password;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get password() {
    return this.props.password;
  }
  get email() {
    return this.props.email;
  }
}
