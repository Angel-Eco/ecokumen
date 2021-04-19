import { User } from '../../shared/models/user.interface';

export class RoleValidator {
  isSuscriptor(user: User): boolean {
    return user.roles === 'SUSCRIPTOR';
  }

  isEditor(user: User): boolean {
    return user.roles === 'EDITOR';
  }

  isAdmin(user: User): boolean {
    return user.roles === 'ADMIN';
  }
}
