import { Application } from '../../../../utils/http-error';

interface RolProps {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
interface CreateRol extends Omit<RolProps, 'id' | 'createdAt' | 'updatedAt'> {}

export class Rol {
  private constructor(private readonly props: RolProps) {}

  updateName(name: string) {
    this.props.name = name;
    this.props.updatedAt = new Date();
  }

  static create(rol: CreateRol) {
    const id = crypto.randomUUID();
    const currentDate = new Date();
    return new Rol({
      id: id,
      name: rol.name,
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
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }

  static mapToModel(rol: { [key: string]: any }) {
    if (!rol.id) {
      throw Application.badRequest('Missing rol id');
    }
    if (!rol.name) {
      throw Application.badRequest('Missing rol name');
    }
    if (!rol.createdAt) {
      throw Application.badRequest('Missing rol createdAt');
    }
    if (!rol.updatedAt) {
      throw Application.badRequest('Missing rol updatedAt');
    }
    return new Rol({
      id: rol.id,
      name: rol.name,
      createdAt: rol.createdAt,
      updatedAt: rol.updatedAt,
    });
  }
}
