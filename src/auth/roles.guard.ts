/*import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role, Student, Teacher } from '@prisma/client';

// A RolesGuard ellenőrzi, hogy a végponton definiálva van-e a @Roles dekorátos
// Ha igen, ellenőrzi, hogy az aktuális user rendelkezik-e a szerepkörrel

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const teacher = context.switchToHttp().getRequest().teacher as Teacher;
    const student = context.switchToHttp().getRequest().student as Student;

    // Komplexebb jogosultságkezelés esetén itt lehet kiegészíteni!
    // A fv. true-t adjon vissza, ha sikeres az autorizáció, false-t ha sikertelen

    return requiredRoles.includes(teacher.role || student.role);
  }
}*/

