import { ApiError } from '../../../../utils/http-error';

interface UserProps {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
interface UserCreate
  extends Omit<UserProps, 'id' | 'createdAt' | 'updatedAt'> {}

export class User {
  private constructor(private props: UserProps) {}

  updateEmail(password: string) {
    this.props.email = password;
    this.props.updatedAt = new Date();
  }

  static create(user: UserCreate) {
    const id = crypto.randomUUID();
    const currentDate = new Date();
    return new User({
      id: id,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: currentDate,
      updatedAt: currentDate,
    });
  }

  get id() {
    return this.props.id;
  }
  get name() {
    return this.props.name;
  }
  get password() {
    return this.props.password;
  }
  get email() {
    return this.props.email;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }

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
    return new User({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }
}
