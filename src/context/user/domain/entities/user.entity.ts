import { Application } from '../../../../utils/http-error';
import { Rol } from '../../../rol/domain/entities/rol.entity';

interface UserProps {
  id: string;
  name: string;
  email: string;
  password?: string;
  provider: string;
  verificationToken?: string;
  active: boolean;
  roles: Rol[];
  createdAt: Date;
  updatedAt: Date;
}
interface UserCreate
  extends Omit<UserProps, 'id' | 'active' | 'createdAt' | 'updatedAt'> {}

export class User {
  private constructor(private props: UserProps) {}

  updateRoles(roles: Rol[]) {
    this.props.roles = roles;
  }

  updatePassword(password: string) {
    this.props.password = password;
    this.markAsUpdated();
  }

  updateEmail(email: string) {
    this.props.email = email;
    this.markAsUpdated();
  }

  updateName(name: string) {
    this.props.name = name;
    this.markAsUpdated();
  }
  private markAsUpdated() {
    this.props.updatedAt = new Date();
  }
  markAsVerified() {
    this.props.verificationToken = '';
    this.markAsUpdated();
  }

  static create(user: UserCreate) {
    const id = crypto.randomUUID();
    const currentDate = new Date();
    return new User({
      id: id,
      name: user.name,
      email: user.email,
      password: user.password,
      provider: user.provider,
      verificationToken: user.verificationToken,
      active: true,
      roles: user.roles,
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
  get provider() {
    return this.props.provider;
  }
  get active() {
    return this.props.active;
  }
  get verificationToken() {
    return this.props.verificationToken;
  }

  get roles() {
    return this.props.roles;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }

  static mapToModel(user: { [key: string]: any }) {
    return new User({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user?.password,
      provider: user?.provider,
      active: user.active,
      verificationToken: user?.verificationToken,
      roles: user.roles,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }
}
